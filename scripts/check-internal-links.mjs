#!/usr/bin/env node
// Verifies every internal markdown link in the repo resolves to a file.
import { resolve } from 'node:path';
import { findBrokenInternalLinks } from '../src/lib/links.ts';

const rootDir = resolve(import.meta.dirname, '..');
const broken = findBrokenInternalLinks(rootDir);

if (broken.length > 0) {
  console.error('Broken internal links:');
  for (const entry of broken) {
    console.error(`  ${entry.file} -> ${entry.link}`);
  }
  process.exit(1);
}
console.log('check:links ok');
