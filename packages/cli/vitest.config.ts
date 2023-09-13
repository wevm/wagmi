import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  test: {
    name: '@wagmi/cli',
    environment: 'node',
    testTimeout: 10_000,
    setupFiles: ['./test/setup.ts'],
  },
})
