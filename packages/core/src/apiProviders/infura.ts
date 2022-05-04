import { providers } from 'ethers'

import { defaultInfuraId } from '../constants/rpcs'

import { ApiProvider } from './ApiProvider'

export const infuraProvider = (
  infuraId: string = defaultInfuraId,
): ApiProvider<providers.InfuraProvider, providers.InfuraWebSocketProvider> => {
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
      provider: () => new providers.InfuraProvider(chain.id, infuraId),
      webSocketProvider: () =>
        new providers.InfuraWebSocketProvider(chain.id, infuraId),
    }
  }
}
