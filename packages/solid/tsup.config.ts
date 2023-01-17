import { defineConfig } from 'tsup'

import { getConfig } from '../../scripts/tsup'
import { dependencies, peerDependencies } from './package.json'

export default defineConfig(
  getConfig({
    dev: process.env.DEV === 'true',
    entry: [
      'src/index.ts',
      'src/actions.ts',
      'src/chains.ts',
      'src/connectors/index.ts',
      'src/connectors/coinbaseWallet.ts',
      'src/connectors/injected.ts',
      'src/connectors/ledger.ts',
      'src/connectors/metaMask.ts',
      'src/connectors/mock.ts',
      'src/connectors/walletConnect.ts',
      'src/providers/alchemy.ts',
      'src/providers/infura.ts',
      'src/providers/jsonRpc.ts',
      'src/providers/public.ts',
    ],
    external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    platform: 'browser',
  }),
)
