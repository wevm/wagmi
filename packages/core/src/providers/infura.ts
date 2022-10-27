import { providers } from 'ethers'

import { defaultInfuraApiKey } from '../constants/rpcs'
import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
  // TODO: Make `apiKey` required in next minor version (v0.8).
  apiKey?: string
}

export function infuraProvider({
  apiKey = defaultInfuraApiKey,
  priority,
  stallTimeout,
  weight,
}: InfuraProviderConfig = {}): ChainProviderFn<
  providers.InfuraProvider,
  providers.InfuraWebSocketProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.infura) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.infura}/${apiKey}`,
        },
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, apiKey)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, apiKey),
    }
  }
}
