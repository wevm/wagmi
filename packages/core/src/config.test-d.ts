import { mainnet, sepolia } from '@wagmi/chains'
import { injected } from '@wagmi/connectors'
import { createPublicClient, http } from 'viem'
import { test } from 'vitest'

import { createConfig } from './config.js'

test('high-level config', () => {
  // Create config without needing to import viem modules.
  createConfig({
    chains: [mainnet, sepolia],
    connectors: [injected()],
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
    connectors: [injected()],
    publicClient: ({ chain }) =>
      createPublicClient({
        chain,
        transport: http(),
      }),
  })

  // Create a simple "single chain" config using viem modules.
  // Note that we do not accept `chains` here, it is inferred from Client.
  createConfig({
    connectors: [injected()],
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  })
})

test('`chains` must have at least one chain`', () => {
  createConfig({
    // @ts-expect-error
    chains: [],
    connectors: [injected()],
    transports: {
      [mainnet.id]: http(),
    },
  })
  createConfig({
    // @ts-expect-error
    chains: [],
    connectors: [injected()],
    publicClient: ({ chain }) =>
      createPublicClient({
        chain,
        transport: http(),
      }),
  })
})
