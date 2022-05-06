import { providers } from 'ethers'

import { Chain } from '../types'

import { ApiProvider } from './ApiProvider'

export const staticJsonRpcProvider = ({
  pollingInterval,
  rpcUrls,
}: {
  pollingInterval?: number
  rpcUrls: (chain: Chain) => { rpcUrl: string; webSocketRpcUrl?: string }
}): ApiProvider<
  providers.StaticJsonRpcProvider,
  providers.WebSocketProvider
> => {
  return function (chain) {
    const { rpcUrl, webSocketRpcUrl } = rpcUrls(chain)
    if (rpcUrl === '') return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcUrl,
        },
      },
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(rpcUrl, {
          chainId: chain.id,
          name: chain.name,
        })
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return provider
      },
      ...(webSocketRpcUrl && {
        webSocketProvider: () =>
          new providers.WebSocketProvider(webSocketRpcUrl, chain.id),
      }),
    }
  }
}
