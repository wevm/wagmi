import { mainnet } from '@wagmi/chains'
import { type Chain, type PartialBy } from '@wagmi/core'

import { pool } from './constants.js'

export type ForkChain = Chain & { port: number }

export const getForkChain = async ({
  port,
  ...chain
}: PartialBy<
  Omit<ForkChain, 'rpcUrls'>,
  'name' | 'network' | 'nativeCurrency'
>): Promise<ForkChain> => {
  return {
    ...mainnet, // We are using a mainnet fork for testing.
    ...chain,
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
  }
}

export const testChains = {
  anvil: await getForkChain({ id: 123, port: 8545 }),
  anvilTwo: await getForkChain({
    id: 456,
    nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
    port: 8546,
  }),
} as const satisfies Record<string, ForkChain>
