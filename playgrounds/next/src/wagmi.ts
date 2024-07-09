import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, optimism, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, optimism],
    connectors: [
      injected(),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
      }),
      metaMask(),
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
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
