import { providers } from 'ethers'

import {
  Chain,
  ChainProvider,
  Provider,
  ProviderWithFallbackConfig,
  WebSocketProvider,
} from '../types'

export type ConfigureChainsConfig = { stallTimeout?: number } & (
  | {
      targetQuorum?: number
      minQuorum?: never
    }
  | {
      targetQuorum: number
      minQuorum?: number
    }
)

export function configureChains<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(
  defaultChains: Chain[],
  providers: ChainProvider<TProvider, TWebSocketProvider>[],
  { minQuorum = 1, targetQuorum = 1, stallTimeout }: ConfigureChainsConfig = {},
) {
  if (targetQuorum < minQuorum)
    throw new Error('quorum cannot be lower than minQuorum')

  let chains: Chain[] = []
  const providers_: {
    [chainId: number]: (() => ProviderWithFallbackConfig<TProvider>)[]
  } = {}
  const webSocketProviders_: {
    [chainId: number]: (() => TWebSocketProvider)[]
  } = {}

  for (const chain of defaultChains) {
    let configExists = false
    for (const provider of providers) {
      const apiConfig = provider(chain)

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

    // If no API configuration was found across the providers
    // then we throw an error to the consumer.
    if (!configExists) {
      throw new Error(
        [
          `Could not find valid provider configuration for chain "${chain.name}".\n`,
          "You may need to add `jsonRpcProvider` to `configureChains` with the chain's RPC URLs.",
          'Read more: https://wagmi.sh/docs/providers/jsonRpc',
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
      if (chainProviders.length === 1) return chainProviders[0]() as TProvider
      return fallbackProvider(targetQuorum, minQuorum, chainProviders, {
        stallTimeout,
      })
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
      // WebSockets do not work with `fallbackProvider`
      // Default to first available
      return chainWebSocketProviders[0]()
    },
  } as const
}

function fallbackProvider(
  targetQuorum: number,
  minQuorum: number,
  providers_: (() => ProviderWithFallbackConfig<Provider>)[],
  { stallTimeout }: { stallTimeout?: number },
): providers.FallbackProvider {
  try {
    return new providers.FallbackProvider(
      providers_.map((chainProvider, index) => {
        const provider = chainProvider()
        return {
          provider,
          priority: provider.priority ?? index,
          stallTimeout: provider.stallTimeout ?? stallTimeout,
          weight: provider.weight,
        }
      }),
      targetQuorum,
    )
  } catch (error: any) {
    if (
      error?.message?.includes(
        'quorum will always fail; larger than total weight',
      )
    ) {
      if (targetQuorum === minQuorum) throw error
      return fallbackProvider(targetQuorum - 1, minQuorum, providers_, {
        stallTimeout,
      })
    }
    throw error
  }
}
