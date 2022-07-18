import { providers } from 'ethers'

import { defaultInfuraId } from '../constants/rpcs'
import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
  infuraId?: string
}

export function infuraProvider({
  infuraId = defaultInfuraId,
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
          default: `${chain.rpcUrls.infura}/${infuraId}`,
        },
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, infuraId)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, infuraId),
    }
  }
}
