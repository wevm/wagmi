import { providers } from 'ethers'

import { ApiProvider } from './ApiProvider'

export const fallbackProvider =
  (): ApiProvider<providers.StaticJsonRpcProvider> => {
    return function (chain) {
      if (!chain.rpcUrls.default) return null
      return {
        chain,
        provider: () =>
          new providers.StaticJsonRpcProvider(chain.rpcUrls.default, chain.id),
      }
    }
  }
