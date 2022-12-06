import { providers } from 'ethers'

import type { Chain } from '../chains'
import type {
  ChainProviderFn,
  Provider,
  ProviderWithFallbackConfig,
  WebSocketProvider,
} from '../types'

export type ConfigureChainsConfig = {
  pollingInterval?: number
  stallTimeout?: number
} & (
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
  TChain extends Chain = Chain,
>(
  defaultChains: TChain[],
  providers: ChainProviderFn<TProvider, TWebSocketProvider, TChain>[],
  {
    minQuorum = 1,
    pollingInterval = 4_000,
    targetQuorum = 1,
    stallTimeout,
  }: ConfigureChainsConfig = {},
) {
  if (!defaultChains.length) throw new Error('must have at least one chain')
  if (targetQuorum < minQuorum)
    throw new Error('quorum cannot be lower than minQuorum')

  let chains: TChain[] = []
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
          'Read more: https://wagmi.sh/react/providers/jsonRpc',
        ].join('\n'),
      )
    }
  }

  return {
    chains,
    provider: ({ chainId }: { chainId?: number }) => {
      const activeChain = (chains.find((x) => x.id === chainId) ??
        defaultChains[0]) as TChain
      const chainProviders = providers_[activeChain.id]

      if (!chainProviders || !chainProviders[0])
        throw new Error(`No providers configured for chain "${activeChain.id}"`)

      let provider
      if (chainProviders.length === 1) {
        provider = chainProviders[0]()
      } else {
        provider = fallbackProvider(targetQuorum, minQuorum, chainProviders, {
          stallTimeout,
        })
      }

      // Formatter workaround as Celo does not provide `gasLimit` or `difficulty` on eth_getBlockByNumber.
      if (activeChain.id === 42220) {
        provider.formatter.formats.block = {
          ...provider.formatter.formats.block,
          difficulty: () => 0,
          gasLimit: () => 0,
        }
      }

      return Object.assign(provider, {
        chains,
        pollingInterval,
      })
    },
    webSocketProvider: ({ chainId }: { chainId?: number }) => {
      const activeChain = (chains.find((x) => x.id === chainId) ??
        defaultChains[0]) as TChain
      const chainWebSocketProviders = webSocketProviders_[activeChain.id]

      if (!chainWebSocketProviders) return undefined

      const provider = chainWebSocketProviders[0]?.()

      // Formatter workaround as Celo does not provide `gasLimit` or `difficulty` on eth_getBlockByNumber.
      if (provider && activeChain.id === 42220) {
        provider.formatter.formats.block = {
          ...provider.formatter.formats.block,
          difficulty: () => 0,
          gasLimit: () => 0,
        }
      }

      // WebSockets do not work with `fallbackProvider`
      // Default to first available
      return Object.assign(provider || {}, {
        chains,
      }) as TWebSocketProvider & { chains: TChain[] }
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
