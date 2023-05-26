import { defineProject } from 'vitest/config'

// https://vitest.dev/config/
export default defineProject({
  test: {
    name: '@wagmi/connectors',
    environment: 'jsdom',
  },
})
