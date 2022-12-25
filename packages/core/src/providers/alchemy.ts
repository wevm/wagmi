import { providers } from 'ethers'

import type { ChainProviderFn, FallbackProviderConfig } from '../types'

export type AlchemyProviderConfig = FallbackProviderConfig & {
  /** Your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/). */
  apiKey: string
}

export function alchemyProvider({
  apiKey,
  priority,
  stallTimeout,
  weight,
}: AlchemyProviderConfig): ChainProviderFn<
  providers.AlchemyProvider,
  providers.AlchemyWebSocketProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.alchemy?.http[0]) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${chain.rpcUrls.alchemy?.http[0]}/${apiKey}`] },
        },
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address,
          },
          apiKey,
        )
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address,
          },
          apiKey,
        ),
    }
  }
}
