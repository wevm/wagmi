import { providers } from 'ethers'

import { defaultInfuraId } from '../constants/rpcs'
import { ChainProvider } from '../types'

export function infuraProvider({
  infuraId = defaultInfuraId,
  pollingInterval,
}: {
  infuraId?: string
  pollingInterval?: number
} = {}): ChainProvider<
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
        return provider
      },
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, infuraId),
    }
  }
}
