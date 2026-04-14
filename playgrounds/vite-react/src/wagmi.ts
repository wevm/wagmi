import { del, get, set } from 'idb-keyval'
import { createConfig, createStorage, http } from 'wagmi'
import {
  celo,
  mainnet,
  optimism,
  sepolia,
  tempo,
  tempoTestnet,
} from 'wagmi/chains'
import { baseAccount, metaMask, porto, walletConnect } from 'wagmi/connectors'
import { tempoWallet } from 'wagmi/tempo'

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
  chains: [mainnet, sepolia, optimism, celo, tempo, tempoTestnet],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
    porto(),
    baseAccount(),
    tempoWallet(),
    metaMask({ ui: { headless: true } }),
  ],
  storage: createStorage({ storage: indexedDBStorage, key: 'vite-react' }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [celo.id]: http(),
    [tempo.id]: http(),
    [tempoTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
