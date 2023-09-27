import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  resolve: {
    alias: {
      '@wagmi/core': path.resolve(__dirname, '../core/src/exports'),
      '@wagmi/test': path.resolve(__dirname, '../test/src/exports'),
    },
  },
  test: {
    name: '@wagmi/connectors',
    environment: 'happy-dom',
  },
})
