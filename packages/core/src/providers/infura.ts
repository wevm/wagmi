import { providers } from 'ethers'

import { defaultInfuraId } from '../constants/rpcs'
import { ChainProvider, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
  infuraId?: string
  pollingInterval?: number
}

export function infuraProvider({
  infuraId = defaultInfuraId,
  pollingInterval,
  priority,
  stallTimeout,
  weight,
}: InfuraProviderConfig = {}): ChainProvider<
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
          default: `${chain.rpcUrls.infura}/${infuraId}`,
        },
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, infuraId)
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, infuraId),
    }
  }
}
