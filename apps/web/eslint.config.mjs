import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '@numeral/config-eslint/nextjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'postcss.config.mjs', 'playwright.config.ts'],
        },
      },
    },
  },
  {
    // Next-generated types file.
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    // e2e specs aren't part of the TS project (playwright runs them).
    ignores: ['e2e/**', 'screenshots/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Logs go to stdout via console (12-factor XI). warn/error allowed for
      // signal severity; log is discouraged in source but allowed in scripts.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Test files run via vitest with jest-dom matchers; relax unsafe-call for them
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];
