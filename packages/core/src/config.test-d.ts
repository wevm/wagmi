import { accounts, testConnector } from '@wagmi/test'
import { createPublicClient, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { test } from 'vitest'

import { createConfig } from './config.js'

test('high-level config', () => {
  // Create config without needing to import viem modules.
  createConfig({
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
})

test('low-level config', () => {
  // Create a "multi chain" config using viem modules.
  createConfig({
    chains: [mainnet, sepolia],
    connectors: [testConnector({ accounts })],
    publicClient: ({ chain }) =>
      createPublicClient({
        chain,
        transport: http(),
      }),
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
    publicClient: ({ chain }) =>
      createPublicClient({
        chain,
        transport: http(),
      }),
  })
})
