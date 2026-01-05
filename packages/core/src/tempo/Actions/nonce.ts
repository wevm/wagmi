import type { BaseErrorType } from 'viem'
import { Actions } from 'viem/tempo'
import type { Config } from '../../createConfig.js'
import { filterQueryOptions } from '../../query/utils.js'
import type { ChainIdParameter } from '../../types/properties.js'
import type { PartialBy } from '../../types/utils.js'
import type { QueryOptions, QueryParameter } from './utils.js'

/**
 * Gets the nonce for an account and nonce key.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
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

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'account' | 'nonceKey'>,
  ) {
    return ['getNonce', filterQueryOptions(parameters)] as const
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
      enabled: Boolean(
        rest.account && rest.nonceKey !== undefined && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, { account, nonceKey, ...parameters }] = context.queryKey
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
    > = PartialBy<getNonce.Parameters<config>, 'account' | 'nonceKey'> &
      QueryParameter<
        getNonce.ReturnValue,
        getNonce.ErrorType,
        selectData,
        getNonce.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getNonce.ReturnValue,
    > = QueryOptions<
      getNonce.ReturnValue,
      getNonce.ErrorType,
      selectData,
      getNonce.QueryKey<config>
    >
  }
}

/**
 * Watches for nonce incremented events.
 *
 * @deprecated This function has been deprecated post-AllegroModerato. It will be removed in a future version.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
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

/**
 * Watches for active key count changed events.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const unwatch = Actions.nonce.watchActiveKeyCountChanged(config, {
 *   onActiveKeyCountChanged: (args, log) => {
 *     console.log('Active key count changed:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchActiveKeyCountChanged<config extends Config>(
  config: config,
  parameters: watchActiveKeyCountChanged.Parameters<config>,
): () => void {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.nonce.watchActiveKeyCountChanged(client, rest)
}

export declare namespace watchActiveKeyCountChanged {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.nonce.watchActiveKeyCountChanged.Parameters
}

/**
 * Gets the number of active nonce keys for an account.
 *
 * @deprecated This function has been deprecated post-AllegroModerato. It will be removed in a future version.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const count = await Actions.nonce.getNonceKeyCount(config, {
 *   account: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The number of active nonce keys.
 */
export function getNonceKeyCount<config extends Config>(
  config: config,
  parameters: getNonceKeyCount.Parameters<config>,
): Promise<getNonceKeyCount.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.nonce.getNonceKeyCount(client, rest)
}

export namespace getNonceKeyCount {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.nonce.getNonceKeyCount.Parameters

  export type ReturnValue = Actions.nonce.getNonceKeyCount.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'account'>,
  ) {
    return ['getNonceKeyCount', filterQueryOptions(parameters)] as const
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
      enabled: Boolean(rest.account && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, { account, ...parameters }] = context.queryKey
        if (!account) throw new Error('account is required.')
        return await getNonceKeyCount(config, { account, ...parameters })
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getNonceKeyCount.ReturnValue,
    > = PartialBy<getNonceKeyCount.Parameters<config>, 'account'> &
      QueryParameter<
        getNonceKeyCount.ReturnValue,
        getNonceKeyCount.ErrorType,
        selectData,
        getNonceKeyCount.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getNonceKeyCount.ReturnValue,
    > = QueryOptions<
      getNonceKeyCount.ReturnValue,
      getNonceKeyCount.ErrorType,
      selectData,
      getNonceKeyCount.QueryKey<config>
    >
  }
}
