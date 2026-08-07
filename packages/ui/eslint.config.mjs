import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '@numeral/config-eslint/react-library';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'postcss.config.mjs'],
        },
      },
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    // Vitest setup contains intentional empty stubs for browser APIs jsdom lacks.
    files: ['vitest.setup.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
