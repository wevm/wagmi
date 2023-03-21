import { defineConfig } from 'tsup'

import { getConfig } from '../../scripts/tsup'
import { dependencies } from './package.json'

export default defineConfig(
  getConfig({
    entry: [
      'src/index.ts',
      'src/cli.ts',
      'src/config.ts',
      'src/plugins/index.ts',
    ],
    external: [...Object.keys(dependencies)],
    noExport: ['src/cli.ts'],
  }),
)
