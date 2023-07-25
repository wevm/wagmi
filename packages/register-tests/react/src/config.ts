import { http } from 'viem'
import { createConfig } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'

export const config = createConfig({
  chains: [celo, mainnet, optimism],
  transports: {
    [celo.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
  },
})

export type ChainId = typeof celo.id | typeof mainnet.id | typeof optimism.id

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
