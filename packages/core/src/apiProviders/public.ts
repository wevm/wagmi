import { providers } from 'ethers'

import { ApiProvider } from './ApiProvider'

export const publicProvider = ({
  pollingInterval,
  quorum = 1,
}: {
  pollingInterval?: number
  quorum?: number
} = {}): ApiProvider<providers.BaseProvider> => {
  return function (chain) {
    if (!chain.rpcUrls.default) return null
    return {
      chain,
      provider: () => {
        let provider
        try {
          provider = providers.getDefaultProvider(chain.id, { quorum })
        } catch {
          provider = new providers.StaticJsonRpcProvider(
            chain.rpcUrls.default,
            {
              chainId: chain.id,
              name: chain.name,
            },
          )
        }
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return provider
      },
    }
  }
}
