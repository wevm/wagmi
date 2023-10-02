import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config
export default defineProject({
  resolve: {
    alias: {
      '@wagmi/core': path.resolve(__dirname, '../core/src/exports'),
      wagmi: path.resolve(__dirname, '../react/src/exports'),
    },
  },
})
