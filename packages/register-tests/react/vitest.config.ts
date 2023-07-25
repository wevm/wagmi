import path from 'path'
import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  resolve: {
    alias: {
      wagmi: path.resolve(__dirname, '../react/src'),
    },
  },
})
