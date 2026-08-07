// Feature application: dep dedupe, env append, file copy, README append,
// postInstall validation. Pure functions where possible; the disk-writing
// helpers track every write in a journal so a partial apply can be rolled back.
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const POST_INSTALL_ALLOWLIST = [
  /^bun\s+run\s+\S/,
  /^bun\s+\S/,
  /^bunx\s+\S/,
  /^node\s+\S/,
  /^npx\s+\S/,
];

/**
 * Parse an npm dep spec like '@scope/name@^1.2.3' into name + range.
 *
 * @param {string} spec - Raw dep spec.
 * @returns {{ name: string, range: string }}
 */
export function parseDepSpec(spec) {
  if (typeof spec !== 'string' || spec.length === 0) {
    throw new Error(`Invalid dep spec: ${JSON.stringify(spec)}`);
  }
  // Scoped: @scope/name@range
  if (spec.startsWith('@')) {
    const slash = spec.indexOf('/');
    if (slash === -1) {
      throw new Error(`Invalid scoped dep spec: ${spec}`);
    }
    const at = spec.indexOf('@', slash);
    if (at === -1) return { name: spec, range: 'latest' };
    return { name: spec.slice(0, at), range: spec.slice(at + 1) };
  }
  const at = spec.indexOf('@');
  if (at === -1) return { name: spec, range: 'latest' };
  return { name: spec.slice(0, at), range: spec.slice(at + 1) };
}

/**
 * Extract the major version from a semver range string. Returns null if the
 * range doesn't start with a recognizable numeric component.
 *
 * @param {string} range - A semver range like '^3.24.0' or '~1.2'.
 * @returns {number | null}
 */
function rangeMajor(range) {
  const m = String(range).match(/^[\^~>=<]*\s*v?(\d+)/);
  if (!m) return null;
  return Number(m[1]);
}

/**
 * Compare two dep ranges with the same name. Returns 1 if `a` should win,
 * -1 if `b` should win, or 0 if they are equivalent. Throws if the two ranges
 * are semver-incompatible (different majors).
 *
 * @param {string} a - Range a.
 * @param {string} b - Range b.
 * @param {string} name - Package name (for error messages).
 * @returns {number}
 */
function pickWinner(a, b, name) {
  if (a === b) return 0;

  // workspace:* / urls / file paths win, but warn separately. We treat any
  // non-semver-looking range as a "special" range.
  const isSpecial = (r) =>
    r.startsWith('workspace:') ||
    r.startsWith('file:') ||
    r.startsWith('git+') ||
    r.includes('://');

  if (isSpecial(a) && !isSpecial(b)) return 1;
  if (isSpecial(b) && !isSpecial(a)) return -1;

  const majA = rangeMajor(a);
  const majB = rangeMajor(b);
  if (majA !== null && majB !== null && majA !== majB) {
    throw new Error(
      `Dependency conflict: "${name}" requested at incompatible majors ` +
        `(${a} vs ${b}). Remove one of the conflicting features.`,
    );
  }

  // Exact (no leading qualifier and contains a dot or all-numeric) beats range.
  const isExact = (r) => /^\d+(\.\d+){0,2}([+-].+)?$/.test(r);
  if (isExact(a) && !isExact(b)) return 1;
  if (isExact(b) && !isExact(a)) return -1;

  // Both ranges with same major: take the higher minimum.
  const minA = String(a).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  const minB = String(b).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  if (minA && minB) {
    const partsA = [minA[1], minA[2] ?? '0', minA[3] ?? '0'].map(Number);
    const partsB = [minB[1], minB[2] ?? '0', minB[3] ?? '0'].map(Number);
    for (let i = 0; i < 3; i += 1) {
      if (partsA[i] > partsB[i]) return 1;
      if (partsA[i] < partsB[i]) return -1;
    }
  }
  return 0;
}

/**
 * Merge a list of dep specs into a single name→range map, applying the
 * highest-precedence-range rule. Hard-fails on incompatible majors.
 *
 * @param {string[]} specs - Array of dep specs.
 * @returns {Record<string, string>} Map of package name to chosen range.
 */
export function mergeDeps(specs) {
  const merged = {};
  for (const spec of specs) {
    const { name, range } = parseDepSpec(spec);
    if (!(name in merged)) {
      merged[name] = range;
      continue;
    }
    const cmp = pickWinner(range, merged[name], name);
    if (cmp > 0) merged[name] = range;
  }
  return merged;
}

/**
 * Validate a single postInstall command against the allowlist. Returns null
 * when valid or a string error message when rejected.
 *
 * @param {string} cmd - Command string.
 * @returns {string | null}
 */
export function validatePostInstallCommand(cmd) {
  if (typeof cmd !== 'string' || cmd.trim().length === 0) {
    return 'postInstall command must be a non-empty string';
  }
  const trimmed = cmd.trim();
  // Reject shell metacharacters that could enable arbitrary execution.
  // We accept argument flags, paths, semver-ish tokens; we reject pipes,
  // redirects, command chaining, command substitution, env-var expansion,
  // and globbing.
  if (/[|;&`$<>]/.test(trimmed) || /\$\(/.test(trimmed) || /&&|\|\|/.test(trimmed)) {
    return (
      `postInstall command rejected: "${cmd}". Shell metacharacters ` +
      `(| ; & \` $ < >) are not allowed.`
    );
  }
  const ok = POST_INSTALL_ALLOWLIST.some((re) => re.test(trimmed));
  if (!ok) {
    return (
      `postInstall command rejected: "${cmd}". Allowed prefixes are ` +
      `'bun run ', 'bun ', 'bunx ', 'node ', 'npx '.`
    );
  }
  return null;
}

/**
 * Validate every postInstall command across selected manifests.
 *
 * @param {Array<{ id: string, postInstall?: string[] }>} manifests
 * @returns {string[]} Error messages (empty if all valid).
 */
export function validateAllPostInstall(manifests) {
  const errors = [];
  for (const m of manifests) {
    for (const cmd of m.postInstall ?? []) {
      const err = validatePostInstallCommand(cmd);
      if (err) errors.push(`[${m.id}] ${err}`);
    }
  }
  return errors;
}

/**
 * Substitute ${PROJECT_NAME} into a path. Literal string replace, no
 * escaping, no expressions. See SCHEMA.md "File templating rules".
 *
 * @param {string} path - Path that may contain `${PROJECT_NAME}`.
 * @param {string} projectName - Project name supplied at prompt time.
 * @returns {string} Path with substitution applied.
 */
export function substituteProjectName(path, projectName) {
  return String(path).replaceAll('${PROJECT_NAME}', projectName);
}

/**
 * Render the env-key block that should be appended to .env.example for one
 * manifest. Required keys are uncommented, optional keys are commented out.
 *
 * @param {{ label: string, envKeys?: Array<object> }} manifest
 * @returns {string} Block of text ending with a single trailing newline,
 *   or '' if the manifest declares no env keys.
 */
export function renderEnvBlock(manifest) {
  const keys = manifest.envKeys ?? [];
  if (keys.length === 0) return '';
  const lines = [`# ${manifest.label}`];
  for (const k of keys) {
    if (k.description) lines.push(`# ${k.description}`);
    const entry = `${k.name}=`;
    lines.push(k.required ? entry : `# ${entry}`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Render the README section for a manifest. The block has a leading and
 * trailing newline so consecutive manifests stack cleanly.
 *
 * @param {{ readmeSection: string }} manifest
 * @returns {string}
 */
export function renderReadmeBlock(manifest) {
  const body = String(manifest.readmeSection ?? '').trimEnd();
  return `\n${body}\n`;
}

/**
 * Build a journal-tracked write helper. Every successful write or copy is
 * recorded; on rollback, files are removed in reverse order. Files that
 * pre-existed (skipped due to overwrite:false) are not journaled.
 *
 * @param {string} root - Project root that owns all writes.
 * @returns {{
 *   writeFile: (relPath: string, content: string) => void,
 *   appendFile: (relPath: string, content: string) => void,
 *   copyFile: (srcAbs: string, relDest: string) => void,
 *   journal: string[],
 *   rollback: () => void,
 * }}
 */
export function createWriter(root) {
  const created = [];
  const ensureDir = (abs) => {
    const dir = dirname(abs);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  };
  return {
    journal: created,
    writeFile(relPath, content) {
      const abs = join(root, relPath);
      const preexisted = existsSync(abs);
      ensureDir(abs);
      writeFileSync(abs, content);
      if (!preexisted) created.push(abs);
    },
    appendFile(relPath, content) {
      const abs = join(root, relPath);
      const preexisted = existsSync(abs);
      ensureDir(abs);
      const current = preexisted ? readFileSync(abs, 'utf8') : '';
      writeFileSync(abs, current + content);
      if (!preexisted) created.push(abs);
    },
    copyFile(srcAbs, relDest) {
      const abs = join(root, relDest);
      ensureDir(abs);
      copyFileSync(srcAbs, abs);
      created.push(abs);
    },
    rollback() {
      for (let i = created.length - 1; i >= 0; i -= 1) {
        try {
          rmSync(created[i], { force: true });
        } catch {
          /* ignore */
        }
      }
      created.length = 0;
    },
  };
}

/**
 * Apply the file-copy section of a manifest. Honors `overwrite: false` by
 * skipping (and logging) pre-existing destinations.
 *
 * @param {object} manifest - Manifest with `__dir` and `files`.
 * @param {string} projectRoot - Absolute project root.
 * @param {string} projectName - For ${PROJECT_NAME} substitution.
 * @param {ReturnType<typeof createWriter>} writer
 * @param {(line: string) => void} log - Logging hook.
 * @returns {{ copied: string[], skipped: string[] }}
 */
export function applyFiles(manifest, projectRoot, projectName, writer, log) {
  const copied = [];
  const skipped = [];
  for (const entry of manifest.files ?? []) {
    const dest = substituteProjectName(entry.to, projectName);
    const absDest = join(projectRoot, dest);
    const src = join(manifest.__dir, 'files', entry.from);
    if (!existsSync(src)) {
      throw new Error(
        `[${manifest.id}] file source not found: ${src} (referenced as "${entry.from}")`,
      );
    }
    if (existsSync(absDest) && !entry.overwrite) {
      skipped.push(dest);
      log(`skipped: ${dest} (exists, overwrite:false)`);
      continue;
    }
    writer.copyFile(src, dest);
    copied.push(dest);
    log(`wrote: ${dest}`);
  }
  return { copied, skipped };
}

/**
 * Apply env keys to .env.example by appending blocks for each manifest. The
 * write is idempotent: if a block header (`# <label>`) already appears in
 * the file, it is not appended again.
 *
 * @param {Array<object>} manifests
 * @param {string} projectRoot
 * @param {string} envExampleRel - e.g. 'apps/web/.env.example'
 * @param {ReturnType<typeof createWriter>} writer
 * @param {(line: string) => void} log
 * @returns {{ appended: number }}
 */
export function applyEnvKeys(manifests, projectRoot, envExampleRel, writer, log) {
  const abs = join(projectRoot, envExampleRel);
  const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : '';
  let appended = 0;
  for (const m of manifests) {
    const header = `# ${m.label}`;
    if (existing.includes(header)) {
      log(`env: skipped ${m.label} (already present)`);
      continue;
    }
    const block = renderEnvBlock(m);
    if (!block) continue;
    writer.appendFile(envExampleRel, `\n${block}`);
    appended += 1;
    log(`env: appended ${m.label}`);
  }
  return { appended };
}

/**
 * Append README sections idempotently. If the manifest's `## <label>` heading
 * is already present in the README, the section is skipped.
 *
 * @param {Array<object>} manifests
 * @param {string} projectRoot
 * @param {string} readmeRel - Relative path to the project README.
 * @param {ReturnType<typeof createWriter>} writer
 * @param {(line: string) => void} log
 * @returns {{ appended: number }}
 */
export function applyReadme(manifests, projectRoot, readmeRel, writer, log) {
  const abs = join(projectRoot, readmeRel);
  const existing = existsSync(abs) ? readFileSync(abs, 'utf8') : '';
  let appended = 0;
  for (const m of manifests) {
    const heading = `## ${m.label}`;
    if (existing.includes(heading)) {
      log(`readme: skipped ${m.label} (already present)`);
      continue;
    }
    writer.appendFile(readmeRel, renderReadmeBlock(m));
    appended += 1;
    log(`readme: appended ${m.label}`);
  }
  return { appended };
}
