import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: './src/index.ts',
    bin: './src/cli.ts',
    config: './src/config.ts',
  },
  format: ['esm'],
})
