import { createConfig } from '@wagmi/core'
import { http } from 'viem'

import { chain } from './chains.js'
import { testConnector } from './connector.js'
import { accounts } from './constants.js'

const { mainnet, mainnet2, optimism } = chain

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
