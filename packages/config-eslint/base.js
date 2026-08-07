import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      jsdoc,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true,
        },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Allow numbers in template literals (common pattern in UI code)
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],
      // Allow void-returning arrow functions in event handlers
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      // Allow async functions without await (common in Next.js generateStaticParams)
      '@typescript-eslint/require-await': 'off',
      // Allow both T[] and Array<T> syntax
      '@typescript-eslint/array-type': 'off',
      // Allow explicitly annotated inferred types
      '@typescript-eslint/no-inferrable-types': 'off',
      // Allow explicit type arguments even when inferable
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      // Allow unnecessary conditions (e.g. in generated/example code)
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // FormEvent deprecation is a warning only
      '@typescript-eslint/no-deprecated': 'warn',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',

      // JSDoc on exported functions
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: { FunctionDeclaration: false, MethodDefinition: false },
          contexts: ['ExportNamedDeclaration > FunctionDeclaration'],
          checkConstructors: false,
        },
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '.next/', '.turbo/', 'coverage/', 'storybook-static/'],
  },
);
