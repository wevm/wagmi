import { providers } from 'ethers'

import type { Chain } from '../chains'
import type { ChainProviderFn, FallbackProviderConfig } from '../types'

export type PublicProviderConfig = FallbackProviderConfig

export function publicProvider<TChain extends Chain = Chain>({
  priority,
  stallTimeout,
  weight,
}: PublicProviderConfig = {}): ChainProviderFn<
  TChain,
  providers.StaticJsonRpcProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.default.http[0]) return null
    return {
      chain: chain as TChain,
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(
          chain.rpcUrls.default.http[0],
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address,
          },
        )
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
    }
  }
}
