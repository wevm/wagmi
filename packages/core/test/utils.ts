import { createTestClient, http } from 'viem'

import { createConfig } from '../src/index.js'
import { testChains } from './constants.js'

const { anvil, anvilTwo } = testChains

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
})

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
