import { createClient, goerli, mainnet } from '@wagmi/core'
import type { Provider, WebSocketProvider } from '@wagmi/core'

import { MockConnector } from '../../core/connectors/mock'
import { getProvider, getSigners } from '../../core/test'

import type { CreateClientConfig } from '../src'

type Config = Partial<CreateClientConfig>

export function setupClient(config: Config = {}) {
  return createClient<Provider, WebSocketProvider>({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) =>
      getProvider({ chainId, chains: [mainnet, goerli] }),
    ...config,
  })
}
