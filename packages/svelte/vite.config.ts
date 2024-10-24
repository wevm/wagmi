import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    __VERSION__: JSON.stringify(require('./package.json').version),
  },
  test: {
    name: '@wagmi/svelte',
    include: ['./src/**/*.test.ts'],
    environment: 'happy-dom',
    testTimeout: 10_000,
    setupFiles: ['./test/setup.ts'],
  },
})
