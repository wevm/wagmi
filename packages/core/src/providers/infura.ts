import type { Chain } from '../chains'
import type { ChainProviderFn } from '../types'

export type InfuraProviderConfig = {
  /** Your Infura API key from the [Infura Dashboard](https://infura.io/login). */
  apiKey: string
}

export function infuraProvider<TChain extends Chain = Chain>({
  apiKey,
}: InfuraProviderConfig): ChainProviderFn<TChain> {
  return function (chain) {
    const baseHttpUrl = chain.rpcUrls.infura?.http[0]
    const baseWsUrl = chain.rpcUrls.infura?.webSocket?.[0]
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
