import type * as Query from '@tanstack/query-core'
import type { Config } from '@wagmi/core'
import type {
  ChainIdParameter,
  PartialBy,
  RequiredBy,
} from '@wagmi/core/internal'
import { Actions } from 'viem/tempo'

/**
 * Gets the nonce for an account and nonce key.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'tempo.ts/wagmi'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const nonce = await Actions.nonce.getNonce(config, {
 *   account: '0x...',
 *   nonceKey: 1n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The nonce value.
 */
export function getNonce<config extends Config>(
  config: config,
  parameters: getNonce.Parameters<config>,
): Promise<getNonce.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.nonce.getNonce(client, rest)
}

export namespace getNonce {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.nonce.getNonce.Parameters

  export type ReturnValue = Actions.nonce.getNonce.ReturnValue

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'account' | 'nonceKey'>,
  ) {
    return ['getNonce', parameters] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, { account, nonceKey, ...parameters }] = queryKey
        if (!account) throw new Error('account is required.')
        if (nonceKey === undefined) throw new Error('nonceKey is required.')
        return await getNonce(config, { account, nonceKey, ...parameters })
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getNonce.ReturnValue,
    > = PartialBy<getNonce.Parameters<config>, 'account' | 'nonceKey'> & {
      query?:
        | Omit<ReturnValue<config, selectData>, 'queryKey' | 'queryFn'>
        | undefined
    }

    export type ReturnValue<
      config extends Config,
      selectData = getNonce.ReturnValue,
    > = RequiredBy<
      Query.QueryOptions<
        getNonce.ReturnValue,
        Query.DefaultError,
        selectData,
        getNonce.QueryKey<config>
      >,
      'queryKey' | 'queryFn'
    >
  }
}

/**
 * Watches for nonce incremented events.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'tempo.ts/wagmi'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const unwatch = Actions.nonce.watchNonceIncremented(config, {
 *   onNonceIncremented: (args, log) => {
 *     console.log('Nonce incremented:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchNonceIncremented<config extends Config>(
  config: config,
  parameters: watchNonceIncremented.Parameters<config>,
): () => void {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.nonce.watchNonceIncremented(client, rest)
}

export declare namespace watchNonceIncremented {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.nonce.watchNonceIncremented.Parameters
}
