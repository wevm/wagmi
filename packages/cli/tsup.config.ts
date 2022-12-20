import { defineConfig } from 'tsup'

import { getConfig } from '../../scripts/tsup'
import { dependencies, exports } from './package.json'

export default defineConfig(
  getConfig({
    entry: [
      'src/index.ts',
      'src/cli.ts',
      'src/config.ts',
      'src/plugins/index.ts',
    ],
    exports,
    external: [...Object.keys(dependencies)],
  }),
)
