import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: ['./globalSetup.ts'],
    setupFiles: ['./setup.ts'],
  },
})
