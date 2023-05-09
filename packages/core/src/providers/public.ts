import type { Chain } from '../chains'
import type { ChainProviderFn } from '../types'

export function publicProvider<
  TChain extends Chain = Chain,
>(): ChainProviderFn<TChain> {
  return function (chain) {
    if (!chain.rpcUrls.public.http[0]) return null
    return {
      chain: chain as TChain,
      rpcUrls: chain.rpcUrls.public,
    }
  }
}
