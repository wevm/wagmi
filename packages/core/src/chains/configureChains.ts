import {
  BaseProvider,
  WebSocketProvider as BaseWebSocketProvider,
} from '@ethersproject/providers'

import { Chain } from '../types'

import { ApiProvider } from '../apiProviders/ApiProvider'

export const configureChains = <
  Provider extends BaseProvider = BaseProvider,
  WebSocketProvider extends BaseWebSocketProvider = BaseWebSocketProvider,
>(
  defaultChains: Chain[],
  apiProviders: ApiProvider<Provider, WebSocketProvider>[],
) => {
  let chains: Chain[] = []
  const providers: { [chainId: number]: () => Provider } = {}
  const webSocketProviders: { [chainId: number]: () => WebSocketProvider } = {}

  for (const chain of defaultChains) {
    let apiConfig
    for (const apiProvider of apiProviders) {
      apiConfig = apiProvider(chain)

      // If no API configuration was found (ie. no RPC URL) for
      // this provider, then we skip and check the next one.
      if (!apiConfig) continue

      chains = [...chains, apiConfig.chain]
      providers[chain.id] = apiConfig.provider
      if (apiConfig.webSocketProvider) {
        webSocketProviders[chain.id] = apiConfig.webSocketProvider
      }

      // We have populated configuration for this chain, we
      // can escape now 🥳.
      break
    }

    // If no API configuration was found across the API providers
    // then we throw an error to the consumer.
    if (!apiConfig) {
      throw new Error(
        [
          `Could not find valid API provider configuration for chain "${chain.name}".\n`,
          "You may need to add `staticJsonRpcProvider` to `configureChains` with the chain's RPC URLs.",
          'Read more: https://wagmi.sh/docs/api-providers/json-rpc',
        ].join('\n'),
      )
    }
  }

  return {
    chains,
    provider: ({ chainId }: { chainId?: number }) => {
      return providers[
        chainId && chains.some((x) => x.id === chainId)
          ? chainId
          : defaultChains[0].id
      ]()
    },
    webSocketProvider: ({ chainId }: { chainId?: number }) => {
      return webSocketProviders[
        chainId && chains.some((x) => x.id === chainId)
          ? chainId
          : defaultChains[0].id
      ]?.()
    },
  }
}
