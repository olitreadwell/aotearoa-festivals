// Manifest loading and validation.
//
// Tries to use `ajv` for full JSON-schema validation. If `ajv` is not
// installed (it isn't a runtime dep of the template), falls back to a tiny
// hand-rolled validator that covers the rules the scaffolder relies on.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FEATURE_ID_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const ENV_NAME_RE = /^[A-Z][A-Z0-9_]*$/;
const PUBLIC_ENV_RE = /^NEXT_PUBLIC_[A-Z0-9_]+$/;
const VALID_CATEGORIES = new Set([
  'auth',
  'db',
  'cms',
  'payments',
  'email',
  'jobs',
  'i18n',
  'flags',
  'search',
]);

/**
 * Try to load ajv. Returns a validator function or null if ajv is missing.
 *
 * @param {object} schema - Parsed JSON schema.
 * @returns {Promise<((data: unknown) => string[]) | null>}
 *   Function returning an array of error messages, or null if ajv is absent.
 */
async function tryLoadAjvValidator(schema) {
  try {
    const ajvMod = await import('ajv');
    const Ajv = ajvMod.default ?? ajvMod.Ajv ?? ajvMod;
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    return (data) => {
      const ok = validate(data);
      if (ok) return [];
      return (validate.errors ?? []).map((e) => `${e.instancePath || '/'} ${e.message}`);
    };
  } catch {
    return null;
  }
}

/**
 * Hand-rolled validator covering the rules in manifest.schema.json that the
 * scaffolder actually depends on. Used when ajv is not installed.
 *
 * @param {unknown} data - Manifest object to validate.
 * @returns {string[]} Array of error messages (empty if valid).
 */
function fallbackValidate(data) {
  const errors = [];
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return ['/ manifest must be a JSON object'];
  }
  const m = /** @type {Record<string, unknown>} */ (data);

  const required = [
    'id',
    'category',
    'label',
    'description',
    'dependencies',
    'envKeys',
    'files',
    'readmeSection',
  ];
  for (const key of required) {
    if (!(key in m)) errors.push(`/${key} is required`);
  }

  if (typeof m.id === 'string' && !FEATURE_ID_RE.test(m.id)) {
    errors.push(`/id must match ${FEATURE_ID_RE.source}`);
  }
  if (typeof m.category === 'string' && !VALID_CATEGORIES.has(m.category)) {
    errors.push(`/category must be one of ${[...VALID_CATEGORIES].join(', ')}`);
  }
  if ('label' in m && typeof m.label !== 'string') {
    errors.push('/label must be a string');
  }
  if ('description' in m && typeof m.description !== 'string') {
    errors.push('/description must be a string');
  }
  if ('readmeSection' in m && typeof m.readmeSection !== 'string') {
    errors.push('/readmeSection must be a string');
  }

  for (const arrayKey of ['dependencies', 'devDependencies']) {
    if (!(arrayKey in m)) continue;
    const v = m[arrayKey];
    if (!Array.isArray(v)) {
      errors.push(`/${arrayKey} must be an array`);
      continue;
    }
    for (const [i, item] of v.entries()) {
      if (typeof item !== 'string') {
        errors.push(`/${arrayKey}/${i} must be a string`);
      }
    }
  }

  if ('envKeys' in m) {
    if (!Array.isArray(m.envKeys)) {
      errors.push('/envKeys must be an array');
    } else {
      for (const [i, raw] of m.envKeys.entries()) {
        if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
          errors.push(`/envKeys/${i} must be an object`);
          continue;
        }
        const e = /** @type {Record<string, unknown>} */ (raw);
        for (const k of ['name', 'required', 'description', 'public']) {
          if (!(k in e)) errors.push(`/envKeys/${i}/${k} is required`);
        }
        if (typeof e.name === 'string' && !ENV_NAME_RE.test(e.name)) {
          errors.push(`/envKeys/${i}/name must be UPPER_SNAKE_CASE`);
        }
        if (e.public === true && typeof e.name === 'string' && !PUBLIC_ENV_RE.test(e.name)) {
          errors.push(`/envKeys/${i}/name must start with NEXT_PUBLIC_ when public is true`);
        }
        if ('required' in e && typeof e.required !== 'boolean') {
          errors.push(`/envKeys/${i}/required must be boolean`);
        }
        if ('public' in e && typeof e.public !== 'boolean') {
          errors.push(`/envKeys/${i}/public must be boolean`);
        }
      }
    }
  }

  if ('files' in m) {
    if (!Array.isArray(m.files)) {
      errors.push('/files must be an array');
    } else {
      for (const [i, raw] of m.files.entries()) {
        if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
          errors.push(`/files/${i} must be an object`);
          continue;
        }
        const f = /** @type {Record<string, unknown>} */ (raw);
        for (const k of ['from', 'to', 'overwrite']) {
          if (!(k in f)) errors.push(`/files/${i}/${k} is required`);
        }
        for (const k of ['from', 'to']) {
          const v = f[k];
          if (typeof v !== 'string') {
            errors.push(`/files/${i}/${k} must be a string`);
            continue;
          }
          if (v.startsWith('/')) errors.push(`/files/${i}/${k} must not start with '/'`);
          if (/(^|\/)\.\.(\/|$)/.test(v)) errors.push(`/files/${i}/${k} must not contain '..'`);
        }
        if ('overwrite' in f && typeof f.overwrite !== 'boolean') {
          errors.push(`/files/${i}/overwrite must be boolean`);
        }
      }
    }
  }

  for (const arrayKey of ['conflicts', 'requires', 'postInstall']) {
    if (!(arrayKey in m)) continue;
    const v = m[arrayKey];
    if (!Array.isArray(v)) {
      errors.push(`/${arrayKey} must be an array`);
      continue;
    }
    for (const [i, item] of v.entries()) {
      if (typeof item !== 'string') {
        errors.push(`/${arrayKey}/${i} must be a string`);
        continue;
      }
      if (arrayKey !== 'postInstall' && !FEATURE_ID_RE.test(item)) {
        errors.push(`/${arrayKey}/${i} must be a valid feature id`);
      }
    }
  }

  return errors;
}

/**
 * Build a validator using ajv if available, otherwise the fallback.
 *
 * @param {object} schema - Parsed JSON schema for manifests.
 * @returns {Promise<{
 *   validate: (data: unknown) => string[],
 *   engine: 'ajv' | 'fallback',
 * }>}
 */
export async function createValidator(schema) {
  const ajvValidator = await tryLoadAjvValidator(schema);
  if (ajvValidator) return { validate: ajvValidator, engine: 'ajv' };
  return { validate: fallbackValidate, engine: 'fallback' };
}

/**
 * Read and JSON-parse a manifest file.
 *
 * @param {string} filePath - Absolute path to manifest.json.
 * @returns {object} Parsed manifest.
 * @throws {Error} If the file is unreadable or contains malformed JSON.
 */
export function readManifest(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Cannot read manifest at ${filePath}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Malformed JSON in ${filePath}: ${err.message}`);
  }
}

/**
 * Discover manifest files under a features root. Each direct subdirectory
 * is expected to contain a `manifest.json`. Subdirectories starting with
 * `_` are skipped (reserved for fixtures, internal docs, etc.).
 *
 * @param {string} featuresDir - Absolute path to scripts/features/.
 * @returns {Array<{ id: string, dir: string, manifestPath: string }>}
 */
export function discoverManifests(featuresDir) {
  let entries;
  try {
    entries = readdirSync(featuresDir);
  } catch {
    return [];
  }
  // Sort for deterministic discovery order across platforms.
  entries.sort();
  const results = [];
  for (const name of entries) {
    if (name.startsWith('_') || name.startsWith('.')) continue;
    const dir = join(featuresDir, name);
    let st;
    try {
      st = statSync(dir);
    } catch {
      continue;
    }
    if (!st.isDirectory()) continue;
    const manifestPath = join(dir, 'manifest.json');
    try {
      statSync(manifestPath);
    } catch {
      continue;
    }
    results.push({ id: name, dir, manifestPath });
  }
  return results;
}

/**
 * Load all manifests in a directory, validating each against the schema.
 * Throws on the first invalid or malformed manifest with an actionable error.
 *
 * @param {string} featuresDir - Absolute path to scripts/features/.
 * @param {object} schema - Parsed JSON schema.
 * @returns {Promise<{
 *   manifests: Array<object & { __dir: string }>,
 *   engine: 'ajv' | 'fallback',
 * }>}
 */
export async function loadManifests(featuresDir, schema) {
  const { validate, engine } = await createValidator(schema);
  const discovered = discoverManifests(featuresDir);
  const manifests = [];
  for (const entry of discovered) {
    const manifest = readManifest(entry.manifestPath);
    const errs = validate(manifest);
    if (errs.length > 0) {
      throw new Error(
        `Manifest validation failed for ${entry.manifestPath}:\n  - ${errs.join('\n  - ')}`,
      );
    }
    if (manifest.id !== entry.id) {
      throw new Error(
        `Manifest id mismatch in ${entry.manifestPath}: id is "${manifest.id}", folder is "${entry.id}"`,
      );
    }
    manifests.push(Object.assign(manifest, { __dir: entry.dir }));
  }
  return { manifests, engine };
}

/**
 * Detect conflicts among a chosen set of manifests. `conflicts` is treated
 * as symmetric (a→b implies b→a).
 *
 * @param {Array<object>} chosen - Selected manifests.
 * @returns {string[]} Array of human-readable conflict messages (empty if none).
 */
export function detectConflicts(chosen) {
  const errors = [];
  const ids = new Set(chosen.map((m) => m.id));
  for (const m of chosen) {
    const list = m.conflicts ?? [];
    for (const other of list) {
      if (ids.has(other)) {
        const a = m.id < other ? m.id : other;
        const b = m.id < other ? other : m.id;
        const msg = `Features "${a}" and "${b}" cannot be selected together.`;
        if (!errors.includes(msg)) errors.push(msg);
      }
    }
  }
  return errors;
}

/**
 * Detect missing `requires` dependencies among chosen manifests.
 *
 * @param {Array<object>} chosen - Selected manifests.
 * @returns {string[]} Messages naming missing dependencies (empty if none).
 */
export function detectMissingRequires(chosen) {
  const errors = [];
  const ids = new Set(chosen.map((m) => m.id));
  for (const m of chosen) {
    for (const req of m.requires ?? []) {
      if (!ids.has(req)) {
        errors.push(`Feature "${m.id}" requires "${req}" but it was not selected.`);
      }
    }
  }
  return errors;
}

export { FEATURE_ID_RE, VALID_CATEGORIES };
