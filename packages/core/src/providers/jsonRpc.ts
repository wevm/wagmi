import type { Chain } from '../chains'
import type { ChainProviderFn } from '../types'

export type JsonRpcProviderConfig = {
  rpc: (chain: Chain) => { http: string; webSocket?: string } | null
}

export function jsonRpcProvider<TChain extends Chain = Chain>({
  rpc,
}: JsonRpcProviderConfig): ChainProviderFn<TChain> {
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
      rpcUrls: {
        http: [rpcConfig.http],
        webSocket: rpcConfig.webSocket ? [rpcConfig.webSocket] : undefined,
      },
    }
  }
}
