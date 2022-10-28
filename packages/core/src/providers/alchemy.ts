import { providers } from 'ethers'

import { defaultAlchemyApiKey } from '../constants'
import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type AlchemyProviderConfig = FallbackProviderConfig & {
  // TODO: Make `apiKey` required in next minor version (v0.8).
  apiKey?: string
}

export function alchemyProvider({
  apiKey = defaultAlchemyApiKey,
  priority,
  stallTimeout,
  weight,
}: AlchemyProviderConfig = {}): ChainProviderFn<
  providers.AlchemyProvider,
  providers.AlchemyWebSocketProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.alchemy) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${apiKey}`,
        },
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(chain.id, apiKey)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, apiKey),
    }
  }
}
