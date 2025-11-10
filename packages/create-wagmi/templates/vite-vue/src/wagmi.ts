import { createConfig, createStorage, http } from '@wagmi/vue'
import { mainnet, optimism, sepolia } from '@wagmi/vue/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  storage: createStorage({ storage: localStorage, key: 'vite-vue' }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
  },
})

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}
