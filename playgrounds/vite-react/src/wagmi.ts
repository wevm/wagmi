import { http, createConfig, createStorage } from 'wagmi'
import { celo, mainnet, optimism, sepolia } from 'wagmi/chains'
import {
  coinbaseWallet,
  injected,
  ledger,
  safe,
  walletConnect,
} from 'wagmi/connectors'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, celo],
  connectors: [
    injected({ wallet: 'metaMask' }),
    injected({ wallet: 'coinbaseWallet' }),
    injected({ wallet: 'phantom' }),
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    coinbaseWallet({ appName: 'Vite React Playground', darkMode: true }),
    ledger({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    safe({ debug: true, shimDisconnect: true }),
  ],
  reconnectOnMount: true,
  storage: createStorage({ storage: localStorage, key: 'vite-react' }),
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/StF61Ht3J9nXAojZX-b21LVt9l0qDL38',
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/roJyEHxkj7XWg1T9wmYnxvktDodQrFAS',
    ),
    [optimism.id]: http(),
    [celo.id]: http(),
  },
})
