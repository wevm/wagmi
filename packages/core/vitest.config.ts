import { defineConfig } from 'vitest/config'

export default defineConfig({
  envDir: '../../',
  test: {
    globalSetup: ['./tests/setup/globalSetup.ts'],
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: ['**/dist/**', '**/tests/**', '**/*.test.ts'],
    },
  },
})
