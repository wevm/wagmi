import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { celo, mainnet, optimism, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, safe, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, celo],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    coinbaseWallet({ appName: 'Vite React Playground', darkMode: true }),
    safe({ debug: true, shimDisconnect: true }),
  ],
  ssr: true,
  storage: createStorage({
    key: 'vite-ssr-react',
    storage: cookieStorage,
  }),
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

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
