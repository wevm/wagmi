import type { Account, BaseErrorType } from 'viem'
import { Actions } from 'viem/tempo'
import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type { PartialBy, UnionLooseOmit } from '../../types/utils.js'
import type { QueryOptions, QueryParameter } from './utils.js'
import { filterQueryOptions } from './utils.js'

/**
 * Gets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.fee.getUserToken(config, {
 *   account: '0x20c...0055',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export function getUserToken<config extends Config>(
  config: config,
  parameters: getUserToken.Parameters<config>,
): Promise<getUserToken.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.fee.getUserToken(client, rest)
}

export namespace getUserToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.fee.getUserToken.Parameters

  export type ReturnValue = Actions.fee.getUserToken.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'account'>,
  ) {
    return ['getUserToken', filterQueryOptions(parameters)] as const
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
        return await getUserToken(config, { account, ...parameters })
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getUserToken.ReturnValue,
    > = PartialBy<getUserToken.Parameters<config>, 'account'> &
      QueryParameter<
        getUserToken.ReturnValue,
        getUserToken.ErrorType,
        selectData,
        getUserToken.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getUserToken.ReturnValue,
    > = QueryOptions<
      getUserToken.ReturnValue,
      getUserToken.ErrorType,
      selectData,
      getUserToken.QueryKey<config>
    >
  }
}

/**
 * Sets the user's default fee token.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.fee.setUserToken(config, {
 *   token: '0x20c...0055',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setUserToken<config extends Config>(
  config: config,
  parameters: setUserToken.Parameters<config>,
): Promise<Actions.fee.setUserToken.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.fee.setUserToken(client, parameters as never)
}

export declare namespace setUserToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.fee.setUserToken.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.fee.setUserToken.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.fee.setUserToken.ErrorType
}

/**
 * Sets the user's default fee token.
 *
 * Note: This is a synchronous action that waits for the transaction to
 * be included on a block before returning a response.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.fee.setUserTokenSync(config, {
 *   token: '0x20c...0055',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setUserTokenSync<config extends Config>(
  config: config,
  parameters: setUserTokenSync.Parameters<config>,
): Promise<Actions.fee.setUserTokenSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.fee.setUserTokenSync(client, parameters as never)
}

export declare namespace setUserTokenSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.fee.setUserTokenSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.fee.setUserTokenSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.fee.setUserTokenSync.ErrorType
}

/**
 * Watches for user token set events on the Fee Manager.
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
 * const unwatch = Actions.fee.watchSetUserToken(config, {
 *   onUserTokenSet: (args, log) => {
 *     console.log('User token set:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchSetUserToken<config extends Config>(
  config: config,
  parameters: watchSetUserToken.Parameters<config>,
): () => void {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.fee.watchSetUserToken(client, rest)
}

export declare namespace watchSetUserToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.fee.watchSetUserToken.Parameters
}
