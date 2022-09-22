import { providers } from 'ethers'

import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type CoinbaseNodeProviderConfig = FallbackProviderConfig & {
  username: string
  password: string
}

export function coinbaseNodeProvider({
  username,
  password,
  priority,
  stallTimeout,
  weight,
}: CoinbaseNodeProviderConfig): ChainProviderFn<providers.StaticJsonRpcProvider> {
  return function (chain) {
    if (!chain.rpcUrls.coinbaseNode) return null
    return {
      chain,
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(
          {
            url: chain.rpcUrls.coinbaseNode!,
            user: username,
            password,
          },
          { chainId: chain.id, name: chain.network },
        )
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
    }
  }
}
