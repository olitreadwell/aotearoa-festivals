#!/usr/bin/env node
// Numeral Studio interactive scaffolder. T5.2.
//
// Usage:
//   node scripts/setup.mjs            interactive setup
//   node scripts/setup.mjs --dry-run  list prompts that would fire, no writes
//   node scripts/setup.mjs --help     print help and exit
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

import {
  applyEnvKeys,
  applyFiles,
  applyReadme,
  createWriter,
  mergeDeps,
  validateAllPostInstall,
} from './lib/apply.mjs';
import { detectConflicts, detectMissingRequires, loadManifests } from './lib/manifest.mjs';
import { applyScopeRename, normalizeScope } from './lib/scope.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = resolve(HERE, '..');
const FEATURES_DIR = join(HERE, 'features');
const SCHEMA_PATH = join(FEATURES_DIR, 'manifest.schema.json');
const ENV_EXAMPLE_REL = 'apps/web/.env.example';
const README_REL = 'README.md';

/**
 * Minimal stdout writer. We avoid console.log per project rules.
 *
 * @param {string} line - Text to emit (newline appended).
 */
function out(line) {
  process.stdout.write(`${line}\n`);
}

/**
 * Print the CLI help text.
 *
 * @returns {void}
 */
function printHelp() {
  out('Numeral Studio scaffolder');
  out('');
  out('Usage:');
  out('  node scripts/setup.mjs           interactive setup');
  out('  node scripts/setup.mjs --dry-run list prompts and selections without writing');
  out('  node scripts/setup.mjs --help    print this help');
  out('');
  out('Reads feature manifests from scripts/features/<id>/manifest.json,');
  out('prompts you to pick one option per category, then applies the choices.');
}

/**
 * Try to dynamically import @clack/prompts. Returns null if unavailable so
 * callers can fall back to a built-in readline prompt.
 *
 * @returns {Promise<null | object>}
 */
async function tryLoadClack() {
  try {
    return await import('@clack/prompts');
  } catch {
    return null;
  }
}

/**
 * Tiny readline-based fallback prompt set.
 *
 * @returns {{
 *   text: (msg: string, fallback?: string) => Promise<string>,
 *   select: (msg: string, choices: Array<{ value: string, label: string }>)
 *     => Promise<string>,
 *   confirm: (msg: string) => Promise<boolean>,
 * }}
 */
function fallbackPrompts() {
  // A single shared readline interface keeps stdin alive across multiple
  // prompts. Closing and reopening on every call hangs under Bun when stdin
  // is piped rather than a TTY.
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  let closed = false;
  rl.on('close', () => {
    closed = true;
  });
  const ask = (q) =>
    new Promise((resolveAnswer) => {
      if (closed) {
        resolveAnswer('');
        return;
      }
      let answered = false;
      const onClose = () => {
        if (!answered) {
          answered = true;
          resolveAnswer('');
        }
      };
      rl.once('close', onClose);
      rl.question(q, (answer) => {
        if (answered) return;
        answered = true;
        rl.off('close', onClose);
        resolveAnswer(answer.trim());
      });
    });
  return {
    async text(msg, fallback = '') {
      const suffix = fallback ? ` [${fallback}]` : '';
      const a = await ask(`${msg}${suffix}: `);
      return a || fallback;
    },
    async select(msg, choices) {
      out(msg);
      choices.forEach((c, i) => out(`  ${i + 1}) ${c.label}`));
      const a = await ask('Enter number: ');
      const idx = Number(a) - 1;
      if (Number.isNaN(idx) || idx < 0 || idx >= choices.length) {
        return choices[0].value;
      }
      return choices[idx].value;
    },
    async confirm(msg) {
      const a = await ask(`${msg} [Y/n]: `);
      return a === '' || /^y(es)?$/i.test(a);
    },
    close() {
      rl.close();
    },
  };
}

/**
 * Build a unified prompt object. Uses @clack/prompts when present, otherwise
 * the readline fallback. The shape is the small subset we actually need.
 *
 * @returns {Promise<{
 *   text: (msg: string, fallback?: string) => Promise<string>,
 *   select: (msg: string, choices: Array<{ value: string, label: string }>)
 *     => Promise<string>,
 *   confirm: (msg: string) => Promise<boolean>,
 *   engine: 'clack' | 'fallback',
 * }>}
 */
async function makePrompts() {
  const clack = await tryLoadClack();
  if (!clack) {
    return Object.assign(fallbackPrompts(), { engine: 'fallback' });
  }
  return {
    engine: 'clack',
    async text(msg, fallback = '') {
      const v = await clack.text({ message: msg, placeholder: fallback });
      if (clack.isCancel(v)) process.exit(1);
      return (v && String(v).trim()) || fallback;
    },
    async select(msg, choices) {
      const v = await clack.select({
        message: msg,
        options: choices.map((c) => ({ value: c.value, label: c.label })),
      });
      if (clack.isCancel(v)) process.exit(1);
      return v;
    },
    async confirm(msg) {
      const v = await clack.confirm({ message: msg, initialValue: true });
      if (clack.isCancel(v)) process.exit(1);
      return Boolean(v);
    },
  };
}

/**
 * Group manifests by category, preserving insertion order.
 *
 * @param {Array<{ category: string }>} manifests
 * @returns {Map<string, Array<object>>}
 */
function groupByCategory(manifests) {
  const map = new Map();
  for (const m of manifests) {
    if (!map.has(m.category)) map.set(m.category, []);
    map.get(m.category).push(m);
  }
  return map;
}

/**
 * Run the full interactive setup flow against a project root.
 *
 * @param {object} opts
 * @param {string} opts.projectRoot - Project root to write into.
 * @param {string} opts.featuresDir - Where to find feature manifests.
 * @param {string} opts.schemaPath - Path to manifest.schema.json.
 * @param {boolean} opts.dryRun - When true, no writes are performed.
 * @param {(line: string) => void} opts.log - Logger.
 * @param {object} [opts.promptOverrides] - Inject prompts (for testing).
 * @returns {Promise<{ status: 'ok' | 'aborted', summary: object }>}
 */
export async function runSetup({
  projectRoot,
  featuresDir,
  schemaPath,
  dryRun,
  log,
  promptOverrides,
}) {
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const { manifests, engine: validatorEngine } = await loadManifests(featuresDir, schema);

  const prompts = promptOverrides ?? (await makePrompts());
  log(
    `Numeral Studio scaffolder (validator: ${validatorEngine}, prompts: ${prompts.engine ?? 'override'})`,
  );

  const projectName = await prompts.text('Project name', 'numeral-app');
  const scopeInput = await prompts.text('Package scope (e.g., @mycompany)', '@numeral');

  const grouped = groupByCategory(manifests);
  const chosen = [];

  for (const [category, options] of grouped) {
    const choices = [
      { value: '__skip__', label: `Skip (no ${category})` },
      ...options.map((m) => ({ value: m.id, label: `${m.label} - ${m.description}` })),
    ];
    const picked = await prompts.select(`Choose a ${category} option`, choices);
    if (picked !== '__skip__') {
      const m = options.find((o) => o.id === picked);
      if (m) chosen.push(m);
    }
  }

  // Validate selections
  const conflictErrors = detectConflicts(chosen);
  if (conflictErrors.length > 0) {
    for (const err of conflictErrors) log(`error: ${err}`);
    return { status: 'aborted', summary: { errors: conflictErrors } };
  }
  const requiresErrors = detectMissingRequires(chosen);
  if (requiresErrors.length > 0) {
    for (const err of requiresErrors) log(`error: ${err}`);
    return { status: 'aborted', summary: { errors: requiresErrors } };
  }
  const postInstallErrors = validateAllPostInstall(chosen);
  if (postInstallErrors.length > 0) {
    for (const err of postInstallErrors) log(`error: ${err}`);
    return { status: 'aborted', summary: { errors: postInstallErrors } };
  }

  // Pre-merge deps so we can fail fast on incompatible majors before any disk I/O
  const allDeps = chosen.flatMap((m) => m.dependencies ?? []);
  const allDevDeps = chosen.flatMap((m) => m.devDependencies ?? []);
  const mergedDeps = mergeDeps(allDeps);
  const mergedDevDeps = mergeDeps(allDevDeps);

  const totalFiles = chosen.reduce((n, m) => n + (m.files?.length ?? 0), 0);
  const totalEnvKeys = chosen.reduce((n, m) => n + (m.envKeys?.length ?? 0), 0);
  const totalDeps = Object.keys(mergedDeps).length + Object.keys(mergedDevDeps).length;

  const labels = chosen.map((m) => m.label).join(', ') || '(none)';
  log('');
  log(`About to apply: ${labels}.`);
  log(`${totalFiles} files, ${totalEnvKeys} env keys, ${totalDeps} deps.`);
  if (dryRun) {
    log('--dry-run: no changes written.');
    return {
      status: 'ok',
      summary: {
        dryRun: true,
        projectName,
        scope: scopeInput,
        chosen: chosen.map((m) => m.id),
        totalFiles,
        totalEnvKeys,
        totalDeps,
      },
    };
  }

  const proceed = await prompts.confirm('Proceed?');
  if (!proceed) {
    log('Aborted by user.');
    return { status: 'aborted', summary: {} };
  }

  // Apply scope rename
  const scope = normalizeScope(scopeInput);
  if (scope) {
    const updated = applyScopeRename(projectRoot, scope);
    for (const f of updated) log(`scope: updated ${f}`);
  }

  // Apply features
  const writer = createWriter(projectRoot);
  try {
    for (const m of chosen) {
      applyFiles(m, projectRoot, projectName, writer, log);
    }
    applyEnvKeys(chosen, projectRoot, ENV_EXAMPLE_REL, writer, log);
    applyReadme(chosen, projectRoot, README_REL, writer, log);
  } catch (err) {
    log(`error during apply: ${err.message}`);
    log('rolling back partial writes...');
    writer.rollback();
    return { status: 'aborted', summary: { error: err.message } };
  }

  log('');
  log('Setup complete. Next steps:');
  log('  1) npm install');
  log('  2) review .env.example and copy to .env.local');
  log('  3) npm run dev');

  return {
    status: 'ok',
    summary: {
      projectName,
      scope,
      chosen: chosen.map((m) => m.id),
      totalFiles,
      totalEnvKeys,
      totalDeps,
      mergedDeps,
      mergedDevDeps,
    },
  };
}

/**
 * CLI entry point. Parses argv, dispatches help/dry-run/interactive.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }
  const dryRun = args.includes('--dry-run');

  if (!existsSync(SCHEMA_PATH)) {
    process.stderr.write(`Cannot find schema at ${SCHEMA_PATH}\n`);
    process.exit(1);
  }

  const prompts = await makePrompts();
  try {
    const result = await runSetup({
      projectRoot: TEMPLATE_ROOT,
      featuresDir: FEATURES_DIR,
      schemaPath: SCHEMA_PATH,
      dryRun,
      log: out,
      promptOverrides: prompts,
    });
    if (result.status !== 'ok') process.exit(1);
  } finally {
    if (typeof prompts.close === 'function') prompts.close();
  }
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((err) => {
    process.stderr.write(`${err.message}\n`);
    process.exit(1);
  });
}
