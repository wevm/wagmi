import { providers } from 'ethers'

import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type PublicProviderConfig = FallbackProviderConfig & {
  pollingInterval?: number
}

export function publicProvider({
  pollingInterval,
  priority,
  stallTimeout,
  weight,
}: PublicProviderConfig = {}): ChainProviderFn<providers.StaticJsonRpcProvider> {
  return function (chain) {
    if (!chain.rpcUrls.default) return null
    return {
      chain,
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(
          chain.rpcUrls.default,
          {
            chainId: chain.id,
            name: chain.network,
          },
        )
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
    }
  }
}
