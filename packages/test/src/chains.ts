import type { Evaluate } from '@wagmi/core/internal'
import { type Chain, mainnet } from 'viem/chains'

import { getRpcUrls } from './utils.js'

type ForkChain = Evaluate<
  Chain & {
    fork: { blockNumber: bigint; url: string }
    port: number
  }
>

// TODO: Switch to `import('viem/chains').optimism` once formatters are exported
const optimism = {
  id: 10,
  name: 'OP Mainnet',
  network: 'optimism',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'Optimism Explorer',
      url: 'https://explorer.optimism.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 4286263,
    },
  },
} as const

export const chain = {
  mainnet: {
    ...mainnet,
    ...getRpcUrls({ port: 8545 }),
    id: 123,
    fork: {
      blockNumber: process.env.VITE_MAINNET_FORK_BLOCK_NUMBER
        ? BigInt(Number(process.env.VITE_MAINNET_FORK_BLOCK_NUMBER))
        : 16280770n,
      url: process.env.VITE_MAINNET_FORK_URL ?? 'https://cloudflare-eth.com',
    },
  },
  mainnet2: {
    ...mainnet,
    ...getRpcUrls({ port: 8546 }),
    id: 456,
    nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
    fork: {
      blockNumber: process.env.VITE_MAINNET_FORK_BLOCK_NUMBER
        ? BigInt(Number(process.env.VITE_MAINNET_FORK_BLOCK_NUMBER))
        : 16280770n,
      url: process.env.VITE_MAINNET_FORK_URL ?? 'https://cloudflare-eth.com',
    },
  },
  optimism: {
    ...optimism,
    id: 789,
    ...getRpcUrls({ port: 8547 }),
    fork: {
      blockNumber: process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER
        ? BigInt(Number(process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER))
        : 107317577n,
      url: process.env.VITE_OPTIMISM_FORK_URL ?? 'https://mainnet.optimism.io',
    },
  },
} as const satisfies Record<string, ForkChain>
