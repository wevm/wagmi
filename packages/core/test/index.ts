import { Chain, ClientConfig, createClient } from '../src'
import { MockConnector } from '../src/connectors/mock'
import { getProvider, getSigners } from './utils'

type Config = Partial<ClientConfig> & { chains?: Chain[] }

export function setupClient(config: Config = {}) {
  return createClient({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) => getProvider({ chainId, chains: config.chains }),
    ...config,
  })
}

export { mlootContractConfig, wagmigotchiContractConfig } from './constants'
export { getProvider, getWebSocketProvider, getSigners } from './utils'
