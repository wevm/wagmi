import { providers } from 'ethers'

import { defaultAlchemyId } from '../constants'
import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type AlchemyProviderConfig = FallbackProviderConfig & {
  alchemyId?: string
}

export function alchemyProvider({
  alchemyId = defaultAlchemyId,
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
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(chain.id, alchemyId)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, alchemyId),
    }
  }
}
