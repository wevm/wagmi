import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    include: ['packages/**/*.test.ts'],
    setupFiles: [
      './packages/cli/test/setup.ts',
      './packages/core/test/setup.ts',
      './packages/react/test/setup.ts',
    ],
  },
})
