import type { Pretty } from '@wagmi/core/internal'
import { type Chain, mainnet } from 'viem/chains'

import { pool } from './constants.js'

export type ForkChain = Pretty<Chain & { port: number }>

function getRpcUrls({ port }: { port: number }) {
  return {
    port,
    rpcUrls: {
      // These rpc urls are automatically used in the transports.
      default: {
        // Note how we append the worker id to the local rpc urls.
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
      public: {
        // Note how we append the worker id to the local rpc urls.
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
    },
  } as const
}

export const testChains = {
  anvil: {
    ...mainnet,
    id: 123,
    ...getRpcUrls({ port: 8545 }),
  },
  anvilTwo: {
    ...mainnet,
    id: 456,
    nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
    ...getRpcUrls({ port: 8546 }),
  },
} as const satisfies Record<string, ForkChain>
