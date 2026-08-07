import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', '.next', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        '.next/',
        'e2e/',
        '**/*.stories.{ts,tsx}',
        '**/*.d.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
        'next.config.ts',
        'postcss.config.mjs',
        'eslint.config.mjs',
        'playwright.config.ts',
      ],
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
