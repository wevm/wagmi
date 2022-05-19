import { providers } from 'ethers'

import { Chain, ChainProvider, FallbackProviderConfig } from '../types'

export type JsonRpcProviderConfig = FallbackProviderConfig & {
  pollingInterval?: number
  rpcUrls: (chain: Chain) => { rpcUrl: string; webSocketRpcUrl?: string } | null
  static?: boolean
}

export function jsonRpcProvider({
  pollingInterval,
  priority,
  rpcUrls,
  stallTimeout,
  static: static_ = true,
  weight,
}: JsonRpcProviderConfig): ChainProvider<
  providers.JsonRpcProvider,
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
        const RpcProvider = static_
          ? providers.StaticJsonRpcProvider
          : providers.JsonRpcProvider
        const provider = new RpcProvider(rpcConfig.rpcUrl, {
          chainId: chain.id,
          name: chain.network,
        })
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return Object.assign(provider, { priority, stallTimeout, weight })
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
