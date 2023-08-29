import { accounts, testConnector } from '@wagmi/test'
import { http, createClient } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from './config.js'

test('high-level config', () => {
  // Create config without needing to import viem modules.
  const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
  const client = config.getClient({ chainId: mainnet.id })
  expectTypeOf(client.chain).toEqualTypeOf(mainnet)
})

test('low-level config', () => {
  // Create a "multi chain" config using viem modules.
  createConfig({
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    client({ chain }) {
      return createClient({ chain, transport: http() })
    },
  })
})

test('`chains` must have at least one chain`', () => {
  createConfig({
    // @ts-expect-error
    chains: [],
    connectors: [testConnector({ accounts })],
    transports: {
      [mainnet.id]: http(),
    },
  })
  createConfig({
    // @ts-expect-error
    chains: [],
    connectors: [testConnector({ accounts })],
    client: ({ chain }) =>
      createClient({
        chain,
        transport: http(),
      }),
  })
})
