import { providers } from 'ethers'

import { defaultAlchemyId } from '../constants'
import { ChainProvider, FallbackProviderConfig } from '../types'

export type AlchemyProviderConfig = FallbackProviderConfig & {
  alchemyId?: string
  pollingInterval?: number
}

export function alchemyProvider({
  alchemyId = defaultAlchemyId,
  pollingInterval,
  priority,
  stallTimeout,
  weight,
}: AlchemyProviderConfig = {}): ChainProvider<
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
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(chain.id, alchemyId)
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, alchemyId),
    }
  }
}
