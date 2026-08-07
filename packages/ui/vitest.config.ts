import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/index.ts',
        '**/*.d.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
        '.storybook/',
        'postcss.config.mjs',
        'eslint.config.mjs',
      ],
      include: ['src/components/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
