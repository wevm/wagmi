import { http, initConfig } from 'solid-wagmi'
import { celo, mainnet, optimism, sepolia } from 'solid-wagmi/chains'
import { coinbaseWallet, walletConnect } from 'solid-wagmi/connectors'

export const config = initConfig({
  chains: [mainnet, sepolia, optimism, celo],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
    coinbaseWallet({ appName: 'Vite React Playground', darkMode: true }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [celo.id]: http(),
  },
})

declare module 'solid-wagmi' {
  interface Register {
    config: typeof config
  }
}
