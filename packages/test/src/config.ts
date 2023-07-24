import { createConfig } from '@wagmi/core'
import { createTestClient, http } from 'viem'

import { testChains } from './chains.js'
import { testConnector } from './connector.js'
import { accounts } from './constants.js'

const { mainnet: anvil, mainnet2: anvilTwo } = testChains

export const testClient = {
  anvil: createTestClient({
    mode: 'anvil',
    chain: anvil,
    transport: http(),
  }),
  anvilTwo: createTestClient({
    mode: 'anvil',
    chain: anvilTwo,
    transport: http(),
  }),
}

export const config = createConfig({
  chains: [anvil, anvilTwo],
  connectors: [
    testConnector({ accounts }),
    testConnector({
      accounts: [...accounts].reverse() as unknown as typeof accounts,
    }),
  ],
  pollingInterval: 100,
  reconnectOnMount: false,
  storage: null,
  transports: {
    [anvil.id]: http(),
    [anvilTwo.id]: http(),
  },
})
