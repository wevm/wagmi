import type { Account, BaseErrorType } from 'viem'
import { Actions } from 'viem/tempo'
import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type { UnionLooseOmit } from '../../types/utils.js'
import type { QueryOptions, QueryParameter } from './utils.js'

/**
 * Creates a new policy.
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
 * const hash = await Actions.policy.create(config, {
 *   type: 'whitelist',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function create<config extends Config>(
  config: config,
  parameters: create.Parameters<config>,
): Promise<Actions.policy.create.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.create(client, parameters as never)
}

export declare namespace create {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.create.Parameters<config['chains'][number], Account>,
      'chain' | 'admin'
    >

  export type ReturnValue = Actions.policy.create.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.create.ErrorType
}

/**
 * Creates a new policy.
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
 * const result = await Actions.policy.createSync(config, {
 *   type: 'whitelist',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function createSync<config extends Config>(
  config: config,
  parameters: createSync.Parameters<config>,
): Promise<Actions.policy.createSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.createSync(client, parameters as never)
}

export declare namespace createSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.createSync.Parameters<config['chains'][number], Account>,
      'chain' | 'admin'
    >

  export type ReturnValue = Actions.policy.createSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.createSync.ErrorType
}

/**
 * Sets the admin for a policy.
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
 * const hash = await Actions.policy.setAdmin(config, {
 *   policyId: 2n,
 *   admin: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function setAdmin<config extends Config>(
  config: config,
  parameters: setAdmin.Parameters<config>,
): Promise<Actions.policy.setAdmin.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.setAdmin(client, parameters as never)
}

export declare namespace setAdmin {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.setAdmin.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.policy.setAdmin.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.setAdmin.ErrorType
}

/**
 * Sets the admin for a policy.
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
 * const result = await Actions.policy.setAdminSync(config, {
 *   policyId: 2n,
 *   admin: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setAdminSync<config extends Config>(
  config: config,
  parameters: setAdminSync.Parameters<config>,
): Promise<Actions.policy.setAdminSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.setAdminSync(client, parameters as never)
}

export declare namespace setAdminSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.setAdminSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.policy.setAdminSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.setAdminSync.ErrorType
}

/**
 * Modifies a policy whitelist.
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
 * const hash = await Actions.policy.modifyWhitelist(config, {
 *   policyId: 2n,
 *   address: '0x...',
 *   allowed: true,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function modifyWhitelist<config extends Config>(
  config: config,
  parameters: modifyWhitelist.Parameters<config>,
): Promise<Actions.policy.modifyWhitelist.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.modifyWhitelist(client, parameters as never)
}

export declare namespace modifyWhitelist {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.modifyWhitelist.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.policy.modifyWhitelist.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.modifyWhitelist.ErrorType
}

/**
 * Modifies a policy whitelist.
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
 * const result = await Actions.policy.modifyWhitelistSync(config, {
 *   policyId: 2n,
 *   address: '0x...',
 *   allowed: true,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function modifyWhitelistSync<config extends Config>(
  config: config,
  parameters: modifyWhitelistSync.Parameters<config>,
): Promise<Actions.policy.modifyWhitelistSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.modifyWhitelistSync(client, parameters as never)
}

export declare namespace modifyWhitelistSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.modifyWhitelistSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.policy.modifyWhitelistSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.modifyWhitelistSync.ErrorType
}

/**
 * Modifies a policy blacklist.
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
 * const hash = await Actions.policy.modifyBlacklist(config, {
 *   policyId: 2n,
 *   address: '0x...',
 *   restricted: true,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function modifyBlacklist<config extends Config>(
  config: config,
  parameters: modifyBlacklist.Parameters<config>,
): Promise<Actions.policy.modifyBlacklist.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.modifyBlacklist(client, parameters as never)
}

export declare namespace modifyBlacklist {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.modifyBlacklist.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.policy.modifyBlacklist.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.modifyBlacklist.ErrorType
}

/**
 * Modifies a policy blacklist.
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
 * const result = await Actions.policy.modifyBlacklistSync(config, {
 *   policyId: 2n,
 *   address: '0x...',
 *   restricted: true,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function modifyBlacklistSync<config extends Config>(
  config: config,
  parameters: modifyBlacklistSync.Parameters<config>,
): Promise<Actions.policy.modifyBlacklistSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.policy.modifyBlacklistSync(client, parameters as never)
}

export declare namespace modifyBlacklistSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.policy.modifyBlacklistSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.policy.modifyBlacklistSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.policy.modifyBlacklistSync.ErrorType
}

/**
 * Gets policy data.
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
 * const data = await Actions.policy.getData(config, {
 *   policyId: 2n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The policy data.
 */
export function getData<config extends Config>(
  config: config,
  parameters: getData.Parameters<config>,
): Promise<getData.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.getData(client, rest)
}

export namespace getData {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.getData.Parameters

  export type ReturnValue = Actions.policy.getData.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getData', parameters] as const
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
      enabled: Boolean(rest.policyId !== undefined && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getData(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getData.ReturnValue,
    > = getData.Parameters<config> &
      QueryParameter<
        getData.ReturnValue,
        getData.ErrorType,
        selectData,
        getData.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getData.ReturnValue,
    > = QueryOptions<
      getData.ReturnValue,
      getData.ErrorType,
      selectData,
      getData.QueryKey<config>
    >
  }
}

/**
 * Checks if a user is authorized by a policy.
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
 * const authorized = await Actions.policy.isAuthorized(config, {
 *   policyId: 2n,
 *   user: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Whether the user is authorized.
 */
export function isAuthorized<config extends Config>(
  config: config,
  parameters: isAuthorized.Parameters<config>,
): Promise<isAuthorized.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.isAuthorized(client, rest)
}

export namespace isAuthorized {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.isAuthorized.Parameters

  export type ReturnValue = Actions.policy.isAuthorized.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['isAuthorized', parameters] as const
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
        rest.policyId !== undefined && rest.user && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await isAuthorized(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = isAuthorized.ReturnValue,
    > = isAuthorized.Parameters<config> &
      QueryParameter<
        isAuthorized.ReturnValue,
        isAuthorized.ErrorType,
        selectData,
        isAuthorized.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = isAuthorized.ReturnValue,
    > = QueryOptions<
      isAuthorized.ReturnValue,
      isAuthorized.ErrorType,
      selectData,
      isAuthorized.QueryKey<config>
    >
  }
}

/**
 * Watches for policy creation events.
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
 * const unwatch = Actions.policy.watchCreate(config, {
 *   onPolicyCreated: (args, log) => {
 *     console.log('Policy created:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchCreate<config extends Config>(
  config: config,
  parameters: watchCreate.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.watchCreate(client, rest)
}

export declare namespace watchCreate {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.watchCreate.Parameters
}

/**
 * Watches for policy admin update events.
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
 * const unwatch = Actions.policy.watchAdminUpdated(config, {
 *   onAdminUpdated: (args, log) => {
 *     console.log('Policy admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchAdminUpdated<config extends Config>(
  config: config,
  parameters: watchAdminUpdated.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.watchAdminUpdated(client, rest)
}

export declare namespace watchAdminUpdated {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.watchAdminUpdated.Parameters
}

/**
 * Watches for whitelist update events.
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
 * const unwatch = Actions.policy.watchWhitelistUpdated(config, {
 *   onWhitelistUpdated: (args, log) => {
 *     console.log('Whitelist updated:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchWhitelistUpdated<config extends Config>(
  config: config,
  parameters: watchWhitelistUpdated.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.watchWhitelistUpdated(client, rest)
}

export declare namespace watchWhitelistUpdated {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.watchWhitelistUpdated.Parameters
}

/**
 * Watches for blacklist update events.
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
 * const unwatch = Actions.policy.watchBlacklistUpdated(config, {
 *   onBlacklistUpdated: (args, log) => {
 *     console.log('Blacklist updated:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBlacklistUpdated<config extends Config>(
  config: config,
  parameters: watchBlacklistUpdated.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.policy.watchBlacklistUpdated(client, rest)
}

export declare namespace watchBlacklistUpdated {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.policy.watchBlacklistUpdated.Parameters
}
