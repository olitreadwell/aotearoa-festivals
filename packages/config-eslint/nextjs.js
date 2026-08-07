import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

import baseConfig from './base.js';

export default [
  ...baseConfig,
  {
    plugins: {
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Next.js handles React import
      'react/react-in-jsx-scope': 'off',
      // Allow Next.js <img> via next/image
      'jsx-a11y/alt-text': 'error',
      // role="list" on ul/ol restores list semantics in Safari VoiceOver
      'jsx-a11y/no-redundant-roles': 'off',
      // Relax return types for pages/layouts (Next.js convention)
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['src/app/**/*.tsx', 'src/app/**/*.ts'],
    rules: {
      // Pages/layouts export default — JSDoc not required
      'jsdoc/require-jsdoc': 'off',
    },
  },
];
