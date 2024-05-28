import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: false,
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: [
        '**/dist/**',
        '**/*.test.ts',
        '**/*.test-d.ts',
        'packages/cli/**',
        'packages/test/**',
        // ignore third-party connectors
        'packages/connectors/**',
        'packages/core/src/connectors/injected.ts',
      ],
    },
    globalSetup: ['./packages/test/src/globalSetup.ts'],
    setupFiles: ['./packages/test/src/setup.ts'],
    watchExclude: ['**/templates/**'],
  },
})
