import { createConfig, http } from '@wagmi/core'
import { accounts, testConnector } from '@wagmi/test'

import { mainnetFork, optimismFork } from './chains'

export const config = createConfig({
  chains: [mainnetFork, optimismFork],
  connectors: [
    testConnector({ accounts }),
    testConnector({
      // reversing for some variance between connectors
      accounts: [...accounts].reverse() as unknown as typeof accounts,
    }),
  ],
  pollingInterval: 100,
  reconnectOnMount: false,
  storage: null,
  transports: {
    [mainnetFork.id]: http(),
    [optimismFork.id]: http(),
  },
})
