import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: [
      './packages/core/src/test/setup.ts',
      './packages/react/src/test/setup.ts',
    ],
  },
})
