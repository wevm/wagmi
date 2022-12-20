import { providers } from 'ethers'

import type { ChainProviderFn, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
  /** Your Infura API key from the [Infura Dashboard](https://infura.io/login). */
  apiKey: string
}

export function infuraProvider({
  apiKey,
  priority,
  stallTimeout,
  weight,
}: InfuraProviderConfig): ChainProviderFn<
  providers.InfuraProvider,
  providers.InfuraWebSocketProvider
> {
  return function (chain) {
    if (!chain.rpcUrls.infura?.http[0]) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${chain.rpcUrls.infura?.http[0]}/${apiKey}`] },
        },
      },
      provider: () => {
        const provider = new providers.InfuraProvider(
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
        new providers.InfuraWebSocketProvider(
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
