import { providers } from 'ethers'

import type { Chain } from '../chains'
import type { ChainProviderFn, FallbackProviderConfig } from '../types'

export type JsonRpcProviderConfig = FallbackProviderConfig & {
  rpc: (chain: Chain) => { http: string; webSocket?: string } | null
  static?: boolean
}

export function jsonRpcProvider({
  priority,
  rpc,
  stallTimeout,
  static: static_ = true,
  weight,
}: JsonRpcProviderConfig): ChainProviderFn<
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
          default: { http: [rpcConfig.http] },
        },
      },
      provider: () => {
        const RpcProvider = static_
          ? providers.StaticJsonRpcProvider
          : providers.JsonRpcProvider
        const provider = new RpcProvider(rpcConfig.http, {
          ensAddress: chain.contracts?.ensRegistry?.address,
          chainId: chain.id,
          name: chain.network,
        })
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
