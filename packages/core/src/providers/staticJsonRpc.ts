import { providers } from 'ethers'

import { Chain, ChainProvider } from '../types'

export function staticJsonRpcProvider({
  pollingInterval,
  rpcUrls,
}: {
  pollingInterval?: number
  rpcUrls: (chain: Chain) => { rpcUrl: string; webSocketRpcUrl?: string } | null
}): ChainProvider<
  providers.StaticJsonRpcProvider,
  providers.WebSocketProvider
> {
  return function (chain) {
    const rpcConfig = rpcUrls(chain)
    if (!rpcConfig || rpcConfig.rpcUrl === '') return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcConfig.rpcUrl,
        },
      },
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(rpcConfig.rpcUrl, {
          chainId: chain.id,
          name: chain.network,
        })
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return provider
      },
      ...(rpcConfig.webSocketRpcUrl && {
        webSocketProvider: () =>
          new providers.WebSocketProvider(
            rpcConfig.webSocketRpcUrl as string,
            chain.id,
          ),
      }),
    }
  }
}
