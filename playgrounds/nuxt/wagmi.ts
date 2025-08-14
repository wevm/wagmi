import { cookieStorage, createConfig, createStorage, http } from '@wagmi/vue'
import { mainnet, optimism, sepolia } from '@wagmi/vue/chains'
import {
  gemini,
  injected,
  metaMask,
  walletConnect,
} from '@wagmi/vue/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NUXT_PUBLIC_WC_PROJECT_ID!,
    }),
    metaMask(),
    gemini(),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
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
