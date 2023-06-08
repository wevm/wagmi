import type { PartialBy } from '@wagmi/core/internal'
import { type Chain, mainnet } from 'viem/chains'

import { pool } from './constants.js'

export type ForkChain = Chain & { port: number }

export const getForkChain = ({
  port,
  ...chain
}: PartialBy<
  Omit<ForkChain, 'rpcUrls'>,
  'name' | 'network' | 'nativeCurrency'
>) => {
  return {
    ...mainnet, // We are using a mainnet fork for testing.
    ...chain,
    name: chain.name ?? mainnet.name,
    nativeCurrency: chain.nativeCurrency ?? mainnet.nativeCurrency,
    network: chain.network ?? mainnet.network,
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
  } as const satisfies ForkChain
}

export const testChains = {
  anvil: getForkChain({ id: 123, port: 8545 }),
  anvilTwo: getForkChain({
    id: 456,
    nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
    port: 8546,
  }),
} as const satisfies Record<string, ForkChain>
