import { defineConfig } from 'tsup'

import { getConfig } from '../../scripts/tsup'
import { dependencies, peerDependencies } from './package.json'

export default defineConfig(
  getConfig({
    dev: process.env.DEV === 'true',
    entry: [
      'src/index.ts',
      'src/coinbaseWallet.ts',
      'src/injected.ts',
      'src/ledger.ts',
      'src/metaMask.ts',
      'src/mock/index.ts',
      'src/safe.ts',
      'src/walletConnect.ts',
      'src/walletConnectLegacy.ts',
    ],
    external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    platform: 'browser',
  }),
)
