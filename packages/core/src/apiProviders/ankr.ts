import { providers } from 'ethers'

import { defaultAnkrId } from '../constants'

import { ApiProvider } from './ApiProvider'

export function ankrProvider({
  ankrId = defaultAnkrId,
  pollingInterval,
}: {
  ankrId?: string
  pollingInterval?: number
} = {}): ApiProvider<providers.AnkrProvider> {
  return function (chain) {
    if (!chain.rpcUrls.ankr) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.ankr}/${ankrId}`,
        },
      },
      provider: () => {
        const provider = new providers.AnkrProvider(chain.id, ankrId)
        if (pollingInterval) provider.pollingInterval = pollingInterval
        return provider
      },
    }
  }
}
