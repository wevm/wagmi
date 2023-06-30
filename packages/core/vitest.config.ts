import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  resolve: {
    alias: {
      '@wagmi/connectors': path.resolve(__dirname, '../connectors/src'),
      '@wagmi/test': path.resolve(__dirname, '../test/src'),
    },
  },
  test: {
    name: '@wagmi/core',
    environment: 'jsdom',
    testTimeout: 10_000,
    setupFiles: ['./test/setup.ts'],
  },
})
