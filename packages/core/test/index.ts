import { ClientConfig, createClient } from '../src'
import { MockConnector } from '../src/connectors/mock'
import { getProvider, getSigners } from './utils'

type Config = Partial<ClientConfig>

export function setupClient(config: Config = {}) {
  return createClient({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0],
        },
      }),
    ],
    provider: getProvider,
    ...config,
  })
}

export { getProvider, getWebSocketProvider, getSigners } from './utils'
