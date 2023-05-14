import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: ['**/dist/**', '**/*.test.ts', '**/*.test-d.ts'],
    },
  },
})
