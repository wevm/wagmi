import { type Chain, mainnet, optimism } from '@wagmi/core/chains'

import { getRpcUrls } from './utils'

type ChainFork = Chain & {
  fork: { blockNumber: bigint; url: string }
  port: number
}

export const mainnetFork = {
  ...mainnet,
  ...getRpcUrls({ port: 8545 }),
  fork: {
    blockNumber: 16280770n,
    url: 'https://cloudflare-eth.com',
  },
} as const satisfies ChainFork

export const optimismFork = {
  ...optimism,
  ...getRpcUrls({ port: 8546 }),
  fork: {
    blockNumber: 107317577n,
    url: 'https://mainnet.optimism.io',
  },
} as const satisfies ChainFork
