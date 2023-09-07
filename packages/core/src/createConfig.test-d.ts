import { accounts, testConnector } from '@wagmi/test'
import { http, createClient, webSocket } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from './createConfig.js'

test('high-level config', () => {
  // Create config without needing to import viem modules.
  const config = createConfig({
    cacheTime: 100,
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    batch: { multicall: true },
    pollingInterval: { [mainnet.id]: 100 },
    transports: {
      [mainnet.id]: webSocket(),
      [sepolia.id]: http(),
    },
  })
  const client = config.getClient({ chainId: mainnet.id })
  expectTypeOf(client.chain).toEqualTypeOf(mainnet)
  expectTypeOf(client.transport.type).toEqualTypeOf<'webSocket'>()
})

test('low-level config', () => {
  // Create a "multi chain" config using viem modules.
  const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    client({ chain }) {
      return createClient({ chain, transport: http() })
    },
  })
  const client = config.getClient({ chainId: mainnet.id })
  expectTypeOf(client.chain).toEqualTypeOf(mainnet)
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
