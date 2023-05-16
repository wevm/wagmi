import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  resolve: {
    alias: {
      '@wagmi/chains': path.resolve(
        __dirname,
        '../../references/packages/chains/src',
      ),
      '@wagmi/core': path.resolve(__dirname, '../core/src'),
      '@wagmi/connectors': path.resolve(
        __dirname,
        '../../references/packages/connectors/src',
      ),
    },
  },
  test: {
    name: 'wagmi',
    environment: 'jsdom',
    testTimeout: 10_000,
    globalSetup: ['./packages/react/test/globalSetup.ts'],
    setupFiles: ['./test/setup.ts'],
  },
})
