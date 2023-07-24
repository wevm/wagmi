import { createConfig } from '@wagmi/core'
import { createTestClient, http } from 'viem'

import { chain } from './chain.js'
import { testConnector } from './connector.js'
import { accounts } from './constants.js'

const { mainnet, mainnet2, optimism } = chain

export const testClient = {
  mainnet: createTestClient({
    mode: 'anvil',
    chain: mainnet,
    transport: http(),
  }),
  mainnet2: createTestClient({
    mode: 'anvil',
    chain: mainnet2,
    transport: http(),
  }),
  optimism: createTestClient({
    mode: 'anvil',
    chain: optimism,
    transport: http(),
  }),
}

export const config = createConfig({
  chains: [mainnet, mainnet2, optimism],
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
    [mainnet.id]: http(),
    [mainnet2.id]: http(),
    [optimism.id]: http(),
  },
})
