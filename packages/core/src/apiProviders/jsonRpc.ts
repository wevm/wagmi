import { providers } from 'ethers'

import { Chain } from '../types'

import { ApiProvider } from './ApiProvider'

export const jsonRpcProvider = (
  getRpcUrls: (chain: Chain) => { rpcUrl: string; webSocketRpcUrl?: string },
): ApiProvider<
  providers.StaticJsonRpcProvider,
  providers.WebSocketProvider
> => {
  return function (chain) {
    const { rpcUrl, webSocketRpcUrl } = getRpcUrls(chain)
    if (rpcUrl === '') return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcUrl,
        },
      },
      provider: () => new providers.StaticJsonRpcProvider(rpcUrl, chain.id),
      ...(webSocketRpcUrl && {
        webSocketProvider: () =>
          new providers.WebSocketProvider(webSocketRpcUrl, chain.id),
      }),
    }
  }
}
