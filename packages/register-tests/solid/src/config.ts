import { createConfig, mock } from '@wagmi/solid'
import { celo, mainnet, optimism, zksync } from '@wagmi/solid/chains'
import { http } from 'viem'

export const config = createConfig({
  chains: [celo, mainnet, optimism, zksync],
  connectors: [mock({ accounts: ['0x'] })],
  transports: {
    [celo.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [zksync.id]: http(),
  },
})

export type ChainId =
  | typeof celo.id
  | typeof mainnet.id
  | typeof optimism.id
  | typeof zksync.id

declare module '@wagmi/solid' {
  interface Register {
    config: typeof config
  }
}
