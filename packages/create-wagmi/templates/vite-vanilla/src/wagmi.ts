import {
  coinbaseWallet,
  injected,
  walletConnect,
  metaMask,
} from '@wagmi/connectors'
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: 'Create Wagmi',
      },
    }),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
