import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: ['**/dist/**', '**/*.test.ts', '**/*.test-d.ts'],
    },
    globalSetup: ['./packages/test/src/globalSetup.ts'],
    setupFiles: ['./packages/test/src/setup.ts'],
  },
})
