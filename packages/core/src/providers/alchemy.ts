import { providers } from 'ethers'

import { defaultAlchemyId } from '../constants'
import { ChainProvider } from '../types'

export function alchemyProvider({
  alchemyId = defaultAlchemyId,
  pollingInterval,
}: {
  alchemyId?: string
  pollingInterval?: number
} = {}): ChainProvider<
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
        return provider
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, alchemyId),
    }
  }
}
