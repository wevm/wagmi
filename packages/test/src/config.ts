import { testChains } from './chains.js'
import { createConfig } from '@wagmi/core'
import { createTestClient, http } from 'viem'

const { anvil, anvilTwo } = testChains

export const testClient = {
  anvil: createTestClient({
    chain: anvil,
    mode: 'anvil',
    transport: http(),
  }),
  anvilTwo: createTestClient({
    chain: anvilTwo,
    mode: 'anvil',
    transport: http(),
  }),
} as const

export const config = createConfig({
  chains: [anvil, anvilTwo],
  connectors: [],
  pollingInterval: 100,
  reconnectOnMount: false,
  storage: null,
  transports: {
    [anvil.id]: http(),
    [anvilTwo.id]: http(),
  },
})
