import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.next/',
      '.turbo/',
      'coverage/',
      'packages/*/node_modules/',
      // TS/TSX in workspaces are linted by their package-level eslint.config.mjs
      'packages/**/*.{ts,tsx}',
      'apps/**/*.{ts,tsx}',
    ],
  },
];
