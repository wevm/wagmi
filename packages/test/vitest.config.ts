import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  resolve: {
    alias: {
      '@wagmi/chains': path.resolve(__dirname, '../chains/src'),
      '@wagmi/core': path.resolve(__dirname, '../core/src'),
    },
  },
})
