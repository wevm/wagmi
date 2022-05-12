import { providers } from 'ethers'

import { Chain } from '../types'

import { ApiProvider } from '../apiProviders/ApiProvider'

type ConfigureChainsConfig =
  | {
      targetQuorum?: number
      minQuorum?: never
    }
  | {
      targetQuorum: number
      minQuorum?: number
    }

export function configureChains<
  Provider extends providers.BaseProvider = providers.BaseProvider,
  WebSocketProvider extends providers.WebSocketProvider = providers.WebSocketProvider,
>(
  defaultChains: Chain[],
  apiProviders: ApiProvider<Provider, WebSocketProvider>[],
  { targetQuorum = 1, minQuorum = 1 }: ConfigureChainsConfig = {},
) {
  if (targetQuorum < minQuorum)
    throw new Error('quorum cannot be lower than minQuorum')

  let chains: Chain[] = []
  const providers_: { [chainId: number]: (() => Provider)[] } = {}
  const webSocketProviders_: {
    [chainId: number]: (() => WebSocketProvider)[]
  } = {}

  for (const chain of defaultChains) {
    let configExists = false
    for (const apiProvider of apiProviders) {
      const apiConfig = apiProvider(chain)

      // If no API configuration was found (ie. no RPC URL) for
      // this provider, then we skip and check the next one.
      if (!apiConfig) continue

      configExists = true

      if (!chains.some(({ id }) => id === chain.id)) {
        chains = [...chains, apiConfig.chain]
      }
      providers_[chain.id] = [
        ...(providers_[chain.id] || []),
        apiConfig.provider,
      ]
      if (apiConfig.webSocketProvider) {
        webSocketProviders_[chain.id] = [
          ...(webSocketProviders_[chain.id] || []),
          apiConfig.webSocketProvider,
        ]
      }
    }

    // If no API configuration was found across the API providers
    // then we throw an error to the consumer.
    if (!configExists) {
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
      const chainProviders =
        providers_[
          chainId && chains.some((x) => x.id === chainId)
            ? chainId
            : defaultChains[0].id
        ]
      if (chainProviders.length === 1) return chainProviders[0]()
      return fallbackProvider(targetQuorum, minQuorum, chainProviders)
    },
    webSocketProvider: ({ chainId }: { chainId?: number }) => {
      const chainWebSocketProviders =
        webSocketProviders_[
          chainId && chains.some((x) => x.id === chainId)
            ? chainId
            : defaultChains[0].id
        ]

      if (!chainWebSocketProviders) return undefined
      if (chainWebSocketProviders.length === 1)
        return chainWebSocketProviders[0]()
      return fallbackProvider(targetQuorum, minQuorum, chainWebSocketProviders)
    },
  }
}

function fallbackProvider(
  targetQuorum: number,
  minQuorum: number,
  providers_: (() => providers.Provider)[],
): providers.FallbackProvider {
  try {
    return new providers.FallbackProvider(
      providers_.map((chainProvider, index) => ({
        provider: chainProvider(),
        priority: index,
      })),
      targetQuorum,
    )
  } catch (err: any) {
    if (
      err.message.includes('quorum will always fail; larger than total weight')
    ) {
      if (targetQuorum === minQuorum) throw err
      return fallbackProvider(targetQuorum - 1, minQuorum, providers_)
    }
    throw err
  }
}
