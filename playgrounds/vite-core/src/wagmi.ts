import {
  coinbaseWallet,
  injected,
  ledger,
  walletConnect,
} from '@wagmi/connectors'
import { createConfig, createStorage } from '@wagmi/core'
import { mainnet, optimism, sepolia } from '@wagmi/core/chains'
import { http } from 'viem'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  connectors: [
    injected({ wallet: 'metaMask' }),
    injected({ wallet: 'coinbaseWallet' }),
    injected({ wallet: 'phantom' }),
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    coinbaseWallet({ appName: 'Vite React Playground' }),
    ledger({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  // reconnectOnMount: false,
  storage: createStorage({ storage: localStorage, key: 'vite-core' }),
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/StF61Ht3J9nXAojZX-b21LVt9l0qDL38',
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/roJyEHxkj7XWg1T9wmYnxvktDodQrFAS',
    ),
    [optimism.id]: http(),
  },
})
