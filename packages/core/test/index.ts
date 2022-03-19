import { WagmiClientConfig, createClient } from '../src'
import { getMockConnector, getProvider, getSigners } from './utils'

type Config = Partial<WagmiClientConfig>
export function setupWagmiClient(config: Config = {}) {
  return createClient({
    connectors: [
      getMockConnector({
        signer: getSigners()[0],
      }),
    ],
    provider: getProvider,
    ...config,
  })
}

export { getMockConnector, getProvider, getSigners } from './utils'
