// Scope renaming helpers extracted from the original setup.mjs.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DEFAULT_SCOPE = '@numeral';

const SCOPED_FILES = [
  'package.json',
  'apps/web/package.json',
  'packages/ui/package.json',
  'packages/config-typescript/package.json',
  'packages/config-eslint/package.json',
  'packages/config-tailwind/package.json',
  'turbo.json',
];

/**
 * Normalize a user-supplied scope into a valid npm scope.
 *
 * Returns null if the scope is empty or equals the default scope.
 *
 * @param {string} input - Raw user input.
 * @returns {string | null} Normalized scope (with leading '@') or null.
 */
export function normalizeScope(input) {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return null;
  const withAt = trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
  if (withAt === DEFAULT_SCOPE) return null;
  return withAt;
}

/**
 * Replace every occurrence of the default scope with the new scope across
 * the well-known monorepo files.
 *
 * @param {string} root - Absolute path to the project root.
 * @param {string} newScope - Normalized scope (with leading '@').
 * @returns {string[]} Files actually modified.
 */
export function applyScopeRename(root, newScope) {
  const updated = [];
  for (const file of SCOPED_FILES) {
    const filepath = join(root, file);
    if (!existsSync(filepath)) continue;
    const content = readFileSync(filepath, 'utf8');
    if (!content.includes(DEFAULT_SCOPE)) continue;
    writeFileSync(filepath, content.replaceAll(DEFAULT_SCOPE, newScope));
    updated.push(file);
  }
  return updated;
}

export { DEFAULT_SCOPE, SCOPED_FILES };
