import { createConfig, http } from '@wagmi/solid'
import { celo, mainnet, optimism, sepolia } from '@wagmi/solid/chains'
import {
  baseAccount,
  gemini,
  metaMask,
  porto,
  walletConnect,
} from '@wagmi/solid/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, celo],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
    porto(),
    baseAccount(),
    metaMask(),
    gemini(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [celo.id]: http(),
  },
})

declare module '@wagmi/solid' {
  interface Register {
    config: typeof config
  }
}
