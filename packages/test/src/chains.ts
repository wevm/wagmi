/// <reference types="./vite-env.d.ts" />

import type { Compute } from '@wagmi/core/internal'
import {
  type Chain as viem_Chain,
  mainnet as viem_mainnet,
  optimism as viem_optimism,
} from 'viem/chains'

import { getRpcUrls } from './utils.js'

export type Chain = Compute<
  viem_Chain & {
    fork: { blockNumber: bigint; url: string }
    port: number
  }
>

const mainnetFork = {
  blockNumber: 23_535_880n,
  url:
    // biome-ignore lint/complexity/useOptionalChain: _
    (typeof process !== 'undefined' && process.env.VITE_MAINNET_FORK_URL) ||
    (typeof import.meta !== 'undefined' &&
      import.meta.env.VITE_MAINNET_FORK_URL) ||
    'https://eth.merkle.io',
} as const satisfies Chain['fork']

export const mainnet = {
  ...viem_mainnet,
  ...getRpcUrls({ port: 8545 }),
  fork: mainnetFork,
} as const satisfies Chain

export const mainnet2 = {
  ...viem_mainnet,
  ...getRpcUrls({ port: 8546 }),
  id: 456,
  nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
  fork: mainnetFork,
} as const satisfies Chain

export const optimism = {
  ...viem_optimism,
  ...getRpcUrls({ port: 8547 }),
  fork: {
    blockNumber: 107_317_577n,
    url:
      // biome-ignore lint/complexity/useOptionalChain: _
      (typeof process !== 'undefined' && process.env.VITE_OPTIMISM_FORK_URL) ||
      (typeof import.meta !== 'undefined' &&
        import.meta.env.VITE_OPTIMISM_FORK_URL) ||
      'https://mainnet.optimism.io',
  },
} as const satisfies Chain

export const chain = {
  mainnet,
  mainnet2,
  optimism,
}
