import { defineConfig } from 'tsup'

import { dependencies } from './package.json'

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  external: Object.keys(dependencies),
  platform: 'node',
})
