import type { Chain } from '../chains'
import type { ChainProviderFn } from '../types'

export type AlchemyProviderConfig = {
  /** Your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/). */
  apiKey: string
}

export function alchemyProvider<TChain extends Chain = Chain>({
  apiKey,
}: AlchemyProviderConfig): ChainProviderFn<TChain> {
  return function (chain) {
    const baseHttpUrl = chain.rpcUrls.alchemy?.http[0]
    const baseWsUrl = chain.rpcUrls.alchemy?.webSocket?.[0]
    if (!baseHttpUrl) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${baseHttpUrl}/${apiKey}`] },
        },
      } as TChain,
      rpcUrls: {
        http: [`${baseHttpUrl}/${apiKey}`],
        webSocket: [`${baseWsUrl}/${apiKey}`],
      },
    }
  }
}
