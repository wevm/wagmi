import { providers } from 'ethers'

import { ApiProvider } from './ApiProvider'

export function publicProvider({
  pollingInterval,
}: {
  pollingInterval?: number
} = {}): ApiProvider<providers.StaticJsonRpcProvider> {
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
        return provider
      },
    }
  }
}
