import { del, get, set } from 'idb-keyval'
import { http, createConfig } from 'wagmi'
import { celo, mainnet, optimism, sepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, safe, walletConnect } from 'wagmi/connectors'

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const indexedDBStorage = {
  async getItem(name: string) {
    return get(name)
  },
  async setItem(name: string, value: string) {
    await set(name, value)
  },
  async removeItem(name: string) {
    await del(name)
  },
}

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, celo],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
    coinbaseWallet({ appName: 'Vite React Playground', darkMode: true }),
    safe({ debug: true, shimDisconnect: true }),
    metaMask(),
  ],
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
