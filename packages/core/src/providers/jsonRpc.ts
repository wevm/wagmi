import { providers } from 'ethers'

import { Chain, ChainProvider, FallbackProviderConfig } from '../types'

export type JsonRpcProviderConfig = FallbackProviderConfig & {
  pollingInterval?: number
  rpc: (chain: Chain) => { http: string; webSocket?: string } | null
  static?: boolean
}

export function jsonRpcProvider({
  pollingInterval,
  priority,
  rpc,
  stallTimeout,
  static: static_ = true,
  weight,
}: JsonRpcProviderConfig): ChainProvider<
  providers.JsonRpcProvider,
  providers.WebSocketProvider
> {
  return function (chain) {
    const rpcConfig = rpc(chain)
    if (!rpcConfig || rpcConfig.http === '') return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcConfig.http,
        },
      },
      provider: () => {
        const RpcProvider = static_
          ? providers.StaticJsonRpcProvider
          : providers.JsonRpcProvider
        const provider = new RpcProvider(rpcConfig.http, {
          chainId: chain.id,
          name: chain.network,
        })
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      ...(rpcConfig.webSocket && {
        webSocketProvider: () =>
          new providers.WebSocketProvider(
            rpcConfig.webSocket as string,
            chain.id,
          ),
      }),
    }
  }
}
