import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: [
      './packages/core/test/setup.ts',
      './packages/react/test/setup.ts',
    ],
  },
})
