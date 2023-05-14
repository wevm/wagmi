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
      '@wagmi/connectors': path.resolve(
        __dirname,
        '../../references/packages/connectors/src',
      ),
    },
  },
  test: {
    name: '@wagmi/core',
    globalSetup: ['./packages/core/test/globalSetup.ts'],
    setupFiles: ['./test/setup.ts'],
    testTimeout: 10_000,
  },
})
