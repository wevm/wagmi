import { defineConfig } from 'tsup'

import { getConfig } from '../../scripts/tsup'
import { dependencies, exports, peerDependencies } from './package.json'

export default defineConfig(
  getConfig({
    dev: process.env.DEV === 'true',
    entry: [
      'src/index.ts',
      'src/actions.ts',
      'src/chains.ts',
      'src/connectors/coinbaseWallet.ts',
      'src/connectors/injected.ts',
      'src/connectors/metaMask.ts',
      'src/connectors/mock.ts',
      'src/connectors/walletConnect.ts',
      'src/providers/alchemy.ts',
      'src/providers/public.ts',
      'src/providers/infura.ts',
      'src/providers/jsonRpc.ts',
    ],
    exports,
    external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    platform: 'browser',
  }),
)
