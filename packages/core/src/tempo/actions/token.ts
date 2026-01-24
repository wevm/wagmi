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
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { Actions } from '@wagmi/core/tempo'
 * import { tempo } from '@wagmi/core/chains'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.token.approve(config, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function approve<config extends Config>(
  config: config,
  parameters: approve.Parameters<config>,
): Promise<Actions.token.approve.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.approve(client, parameters as never)
}

export declare namespace approve {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.approve.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.approve.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.approve.ErrorType
}

/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.approveSync(config, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function approveSync<config extends Config>(
  config: config,
  parameters: approveSync.Parameters<config>,
): Promise<Actions.token.approveSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.approveSync(client, parameters as never)
}

export declare namespace approveSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.approveSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.approveSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.approveSync.ErrorType
}

/**
 * Burns TIP20 tokens from the caller's balance.
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
 * const hash = await Actions.token.burn(config, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function burn<config extends Config>(
  config: config,
  parameters: burn.Parameters<config>,
): Promise<Actions.token.burn.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.burn(client, parameters as never)
}

export declare namespace burn {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.burn.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.burn.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.burn.ErrorType
}

/**
 * Burns TIP20 tokens from a blocked address.
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
 * const hash = await Actions.token.burnBlocked(config, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function burnBlocked<config extends Config>(
  config: config,
  parameters: burnBlocked.Parameters<config>,
): Promise<Actions.token.burnBlocked.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return await Actions.token.burnBlocked(client, parameters as never)
}

export declare namespace burnBlocked {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.burnBlocked.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.burnBlocked.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.burnBlocked.ErrorType
}

/**
 * Burns TIP20 tokens from a blocked address.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.burnBlockedSync(config, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function burnBlockedSync<config extends Config>(
  config: config,
  parameters: burnBlockedSync.Parameters<config>,
): Promise<Actions.token.burnBlockedSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.burnBlockedSync(client, parameters as never)
}

export declare namespace burnBlockedSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.burnBlockedSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.burnBlockedSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.burnBlockedSync.ErrorType
}

/**
 * Burns TIP20 tokens from the caller's balance.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.burnSync(config, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function burnSync<config extends Config>(
  config: config,
  parameters: burnSync.Parameters<config>,
): Promise<Actions.token.burnSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.burnSync(client, parameters as never)
}

export declare namespace burnSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.burnSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.burnSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.burnSync.ErrorType
}

/**
 * Changes the transfer policy ID for a TIP20 token.
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
 * const hash = await Actions.token.changeTransferPolicy(config, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function changeTransferPolicy<config extends Config>(
  config: config,
  parameters: changeTransferPolicy.Parameters<config>,
): Promise<Actions.token.changeTransferPolicy.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.changeTransferPolicy(client, parameters as never)
}

export declare namespace changeTransferPolicy {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.changeTransferPolicy.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.changeTransferPolicy.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.changeTransferPolicy.ErrorType
}

/**
 * Changes the transfer policy ID for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.changeTransferPolicySync(config, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function changeTransferPolicySync<config extends Config>(
  config: config,
  parameters: changeTransferPolicySync.Parameters<config>,
): Promise<Actions.token.changeTransferPolicySync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.changeTransferPolicySync(client, parameters as never)
}

export declare namespace changeTransferPolicySync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.changeTransferPolicySync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.changeTransferPolicySync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.changeTransferPolicySync.ErrorType
}

/**
 * Creates a new TIP20 token.
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
 * const hash = await Actions.token.create(config, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
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
): Promise<Actions.token.create.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.create(client, parameters as never)
}

export declare namespace create {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.create.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.create.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.create.ErrorType
}

/**
 * Creates a new TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.createSync(config, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
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
): Promise<Actions.token.createSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.createSync(client, parameters as never)
}

export declare namespace createSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.createSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.createSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.createSync.ErrorType
}

/**
 * Updates the quote token for a TIP20 token.
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
 * const hash = await Actions.token.updateQuoteToken(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function updateQuoteToken<config extends Config>(
  config: config,
  parameters: updateQuoteToken.Parameters<config>,
): Promise<Actions.token.updateQuoteToken.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.updateQuoteToken(client, parameters as never)
}

export declare namespace updateQuoteToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.updateQuoteToken.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.updateQuoteToken.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.updateQuoteToken.ErrorType
}

/**
 * Updates the quote token for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.updateQuoteTokenSync(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function updateQuoteTokenSync<config extends Config>(
  config: config,
  parameters: updateQuoteTokenSync.Parameters<config>,
): Promise<Actions.token.updateQuoteTokenSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.updateQuoteTokenSync(client, parameters as never)
}

export declare namespace updateQuoteTokenSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.updateQuoteTokenSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.updateQuoteTokenSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.updateQuoteTokenSync.ErrorType
}

/**
 * Gets TIP20 token allowance.
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
 * const allowance = await Actions.token.getAllowance(config, {
 *   account: '0x...',
 *   spender: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export function getAllowance<config extends Config>(
  config: config,
  parameters: getAllowance.Parameters<config>,
): Promise<getAllowance.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.getAllowance(client, rest)
}

export namespace getAllowance {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.getAllowance.Parameters

  export type ReturnValue = Actions.token.getAllowance.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getAllowance', parameters] as const
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
        rest.account && rest.spender && rest.token && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getAllowance(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getAllowance.ReturnValue,
    > = getAllowance.Parameters<config> &
      QueryParameter<
        getAllowance.ReturnValue,
        getAllowance.ErrorType,
        selectData,
        getAllowance.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getAllowance.ReturnValue,
    > = QueryOptions<
      getAllowance.ReturnValue,
      getAllowance.ErrorType,
      selectData,
      getAllowance.QueryKey<config>
    >
  }
}

/**
 * Gets TIP20 token balance for an address.
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
 * const balance = await Actions.token.getBalance(config, {
 *   account: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export function getBalance<config extends Config>(
  config: config,
  parameters: getBalance.Parameters<config>,
): Promise<getBalance.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.getBalance(client, rest as never)
}

export namespace getBalance {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.getBalance.Parameters

  export type ReturnValue = Actions.token.getBalance.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getBalance', parameters] as const
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
      enabled: Boolean(rest.account && rest.token && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return (await getBalance(config, parameters)) ?? null
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getBalance.ReturnValue,
    > = getBalance.Parameters<config> &
      QueryParameter<
        getBalance.ReturnValue,
        getBalance.ErrorType,
        selectData,
        getBalance.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getBalance.ReturnValue,
    > = QueryOptions<
      getBalance.ReturnValue,
      getBalance.ErrorType,
      selectData,
      getBalance.QueryKey<config>
    >
  }
}

/**
 * Gets TIP20 token metadata.
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
 * const metadata = await Actions.token.getMetadata(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export function getMetadata<config extends Config>(
  config: config,
  parameters: getMetadata.Parameters<config>,
): Promise<getMetadata.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.getMetadata(client, rest)
}

export namespace getMetadata {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.getMetadata.Parameters

  export type ReturnValue = Actions.token.getMetadata.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getMetadata', parameters] as const
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
      enabled: Boolean(rest.token && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getMetadata(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getMetadata.ReturnValue,
    > = getMetadata.Parameters<config> &
      QueryParameter<
        getMetadata.ReturnValue,
        getMetadata.ErrorType,
        selectData,
        getMetadata.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getMetadata.ReturnValue,
    > = QueryOptions<
      getMetadata.ReturnValue,
      getMetadata.ErrorType,
      selectData,
      getMetadata.QueryKey<config>
    >
  }
}

/**
 * Gets the admin role for a specific role in a TIP20 token.
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
 * const adminRole = await Actions.token.getRoleAdmin(config, {
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The admin role hash.
 */
export function getRoleAdmin<config extends Config>(
  config: config,
  parameters: getRoleAdmin.Parameters<config>,
): Promise<getRoleAdmin.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.getRoleAdmin(client, rest)
}

export namespace getRoleAdmin {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.getRoleAdmin.Parameters

  export type ReturnValue = Actions.token.getRoleAdmin.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getRoleAdmin', parameters] as const
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
      enabled: Boolean(rest.token && rest.role && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getRoleAdmin(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getRoleAdmin.ReturnValue,
    > = getRoleAdmin.Parameters<config> &
      QueryParameter<
        getRoleAdmin.ReturnValue,
        getRoleAdmin.ErrorType,
        selectData,
        getRoleAdmin.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getRoleAdmin.ReturnValue,
    > = QueryOptions<
      getRoleAdmin.ReturnValue,
      getRoleAdmin.ErrorType,
      selectData,
      getRoleAdmin.QueryKey<config>
    >
  }
}

/**
 * Grants a role for a TIP20 token.
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
 * const hash = await Actions.token.grantRoles(config, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function grantRoles<config extends Config>(
  config: config,
  parameters: grantRoles.Parameters<config>,
): Promise<Actions.token.grantRoles.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.grantRoles(client, parameters as never)
}

export declare namespace grantRoles {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.grantRoles.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.grantRoles.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.grantRoles.ErrorType
}

/**
 * Grants a role for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.grantRolesSync(config, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function grantRolesSync<config extends Config>(
  config: config,
  parameters: grantRolesSync.Parameters<config>,
): Promise<Actions.token.grantRolesSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.grantRolesSync(client, parameters as never)
}

export declare namespace grantRolesSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.grantRolesSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.grantRolesSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.grantRolesSync.ErrorType
}

/**
 * Checks if an account has a specific role for a TIP20 token.
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
 * const hasRole = await Actions.token.hasRole(config, {
 *   account: '0x...',
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Whether the account has the role.
 */
export function hasRole<config extends Config>(
  config: config,
  parameters: hasRole.Parameters<config>,
): Promise<hasRole.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.hasRole(client, rest)
}

export namespace hasRole {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.hasRole.Parameters

  export type ReturnValue = Actions.token.hasRole.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['hasRole', parameters] as const
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
        rest.token && rest.role && rest.account && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await hasRole(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = hasRole.ReturnValue,
    > = hasRole.Parameters<config> &
      QueryParameter<
        hasRole.ReturnValue,
        hasRole.ErrorType,
        selectData,
        hasRole.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = hasRole.ReturnValue,
    > = QueryOptions<
      hasRole.ReturnValue,
      hasRole.ErrorType,
      selectData,
      hasRole.QueryKey<config>
    >
  }
}

/**
 * Mints TIP20 tokens to an address.
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
 * const hash = await Actions.token.mint(config, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function mint<config extends Config>(
  config: config,
  parameters: mint.Parameters<config>,
): Promise<Actions.token.mint.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.mint(client, parameters as never)
}

export declare namespace mint {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.mint.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.mint.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.mint.ErrorType
}

/**
 * Mints TIP20 tokens to an address.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.mintSync(config, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function mintSync<config extends Config>(
  config: config,
  parameters: mintSync.Parameters<config>,
): Promise<Actions.token.mintSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.mintSync(client, parameters as never)
}

export declare namespace mintSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.mintSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.mintSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.mintSync.ErrorType
}

/**
 * Pauses a TIP20 token.
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
 * const hash = await Actions.token.pause(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function pause<config extends Config>(
  config: config,
  parameters: pause.Parameters<config>,
): Promise<Actions.token.pause.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.pause(client, parameters as never)
}

export declare namespace pause {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.pause.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.pause.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.pause.ErrorType
}

/**
 * Pauses a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.pauseSync(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function pauseSync<config extends Config>(
  config: config,
  parameters: pauseSync.Parameters<config>,
): Promise<Actions.token.pauseSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.pauseSync(client, parameters as never)
}

export declare namespace pauseSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.pauseSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.pauseSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.pauseSync.ErrorType
}

/**
 * Renounces a role for a TIP20 token.
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
 * const hash = await Actions.token.renounceRoles(config, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function renounceRoles<config extends Config>(
  config: config,
  parameters: renounceRoles.Parameters<config>,
): Promise<Actions.token.renounceRoles.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.renounceRoles(client, parameters as never)
}

export declare namespace renounceRoles {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.renounceRoles.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.renounceRoles.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.renounceRoles.ErrorType
}

/**
 * Renounces a role for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.renounceRolesSync(config, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function renounceRolesSync<config extends Config>(
  config: config,
  parameters: renounceRolesSync.Parameters<config>,
): Promise<Actions.token.renounceRolesSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.renounceRolesSync(client, parameters as never)
}

export declare namespace renounceRolesSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.renounceRolesSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.renounceRolesSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.renounceRolesSync.ErrorType
}

/**
 * Revokes a role for a TIP20 token.
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
 * const hash = await Actions.token.revokeRoles(config, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function revokeRoles<config extends Config>(
  config: config,
  parameters: revokeRoles.Parameters<config>,
): Promise<Actions.token.revokeRoles.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.revokeRoles(client, parameters as never)
}

export declare namespace revokeRoles {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.revokeRoles.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.revokeRoles.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.revokeRoles.ErrorType
}

/**
 * Revokes a role for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.revokeRolesSync(config, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function revokeRolesSync<config extends Config>(
  config: config,
  parameters: revokeRolesSync.Parameters<config>,
): Promise<Actions.token.revokeRolesSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.revokeRolesSync(client, parameters as never)
}

export declare namespace revokeRolesSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.revokeRolesSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.revokeRolesSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.revokeRolesSync.ErrorType
}

/**
 * Sets the admin role for a specific role in a TIP20 token.
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
 * const hash = await Actions.token.setRoleAdmin(config, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'pause',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function setRoleAdmin<config extends Config>(
  config: config,
  parameters: setRoleAdmin.Parameters<config>,
): Promise<Actions.token.setRoleAdmin.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.setRoleAdmin(client, parameters as never)
}

export declare namespace setRoleAdmin {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.setRoleAdmin.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.setRoleAdmin.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.setRoleAdmin.ErrorType
}

/**
 * Sets the admin role for a specific role in a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.setRoleAdminSync(config, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'pause',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setRoleAdminSync<config extends Config>(
  config: config,
  parameters: setRoleAdminSync.Parameters<config>,
): Promise<Actions.token.setRoleAdminSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.setRoleAdminSync(client, parameters as never)
}

export declare namespace setRoleAdminSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.setRoleAdminSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.setRoleAdminSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.setRoleAdminSync.ErrorType
}

/**
 * Sets the supply cap for a TIP20 token.
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
 * const hash = await Actions.token.setSupplyCap(config, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function setSupplyCap<config extends Config>(
  config: config,
  parameters: setSupplyCap.Parameters<config>,
): Promise<Actions.token.setSupplyCap.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.setSupplyCap(client, parameters as never)
}

export declare namespace setSupplyCap {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.setSupplyCap.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.setSupplyCap.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.setSupplyCap.ErrorType
}

/**
 * Sets the supply cap for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.setSupplyCapSync(config, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setSupplyCapSync<config extends Config>(
  config: config,
  parameters: setSupplyCapSync.Parameters<config>,
): Promise<Actions.token.setSupplyCapSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.setSupplyCapSync(client, parameters as never)
}

export declare namespace setSupplyCapSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.setSupplyCapSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.setSupplyCapSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.setSupplyCapSync.ErrorType
}

/**
 * Transfers TIP20 tokens to another address.
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
 * const hash = await Actions.token.transfer(config, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function transfer<config extends Config>(
  config: config,
  parameters: transfer.Parameters<config>,
): Promise<Actions.token.transfer.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.transfer(client, parameters as never)
}

export declare namespace transfer {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.transfer.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.transfer.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.transfer.ErrorType
}

/**
 * Transfers TIP20 tokens to another address.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.transferSync(config, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function transferSync<config extends Config>(
  config: config,
  parameters: transferSync.Parameters<config>,
): Promise<Actions.token.transferSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.transferSync(client, parameters as never)
}

export declare namespace transferSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.transferSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.transferSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.transferSync.ErrorType
}

/**
 * Unpauses a TIP20 token.
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
 * const hash = await Actions.token.unpause(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function unpause<config extends Config>(
  config: config,
  parameters: unpause.Parameters<config>,
): Promise<Actions.token.unpause.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.unpause(client, parameters as never)
}

export declare namespace unpause {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.unpause.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.unpause.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.unpause.ErrorType
}

/**
 * Unpauses a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.unpauseSync(config, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function unpauseSync<config extends Config>(
  config: config,
  parameters: unpauseSync.Parameters<config>,
): Promise<Actions.token.unpauseSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.unpauseSync(client, parameters as never)
}

export declare namespace unpauseSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.unpauseSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.token.unpauseSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.unpauseSync.ErrorType
}

/**
 * Prepares the quote token update for a TIP20 token.
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
 * const hash = await Actions.token.prepareUpdateQuoteToken(config, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function prepareUpdateQuoteToken<config extends Config>(
  config: config,
  parameters: prepareUpdateQuoteToken.Parameters<config>,
): Promise<Actions.token.prepareUpdateQuoteToken.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.prepareUpdateQuoteToken(client, parameters as never)
}

export declare namespace prepareUpdateQuoteToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.prepareUpdateQuoteToken.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.token.prepareUpdateQuoteToken.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.prepareUpdateQuoteToken.ErrorType
}

/**
 * Prepares the quote token update for a TIP20 token.
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
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.token.prepareUpdateQuoteTokenSync(config, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function prepareUpdateQuoteTokenSync<config extends Config>(
  config: config,
  parameters: prepareUpdateQuoteTokenSync.Parameters<config>,
): Promise<Actions.token.prepareUpdateQuoteTokenSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })
  return Actions.token.prepareUpdateQuoteTokenSync(client, parameters as never)
}

export declare namespace prepareUpdateQuoteTokenSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.token.prepareUpdateQuoteTokenSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue =
    Actions.token.prepareUpdateQuoteTokenSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.token.prepareUpdateQuoteTokenSync.ErrorType
}

/**
 * Watches for TIP20 token role admin updates.
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
 * const unwatch = Actions.token.watchAdminRole(config, {
 *   onRoleAdminUpdated: (args, log) => {
 *     console.log('Role admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchAdminRole<config extends Config>(
  config: config,
  parameters: watchAdminRole.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchAdminRole(client, rest)
}

export declare namespace watchAdminRole {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchAdminRole.Parameters
}

/**
 * Watches for TIP20 token approval events.
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
 * const unwatch = Actions.token.watchApprove(config, {
 *   onApproval: (args, log) => {
 *     console.log('Approval:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchApprove<config extends Config>(
  config: config,
  parameters: watchApprove.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchApprove(client, rest)
}

export declare namespace watchApprove {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchApprove.Parameters
}

/**
 * Watches for TIP20 token burn events.
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
 * const unwatch = Actions.token.watchBurn(config, {
 *   onBurn: (args, log) => {
 *     console.log('Burn:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBurn<config extends Config>(
  config: config,
  parameters: watchBurn.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchBurn(client, rest)
}

export declare namespace watchBurn {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchBurn.Parameters
}

/**
 * Watches for new TIP20 tokens created.
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
 * const unwatch = Actions.token.watchCreate(config, {
 *   onTokenCreated: (args, log) => {
 *     console.log('Token created:', args)
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
  return Actions.token.watchCreate(client, rest)
}

export declare namespace watchCreate {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchCreate.Parameters
}

/**
 * Watches for TIP20 token mint events.
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
 * const unwatch = Actions.token.watchMint(config, {
 *   onMint: (args, log) => {
 *     console.log('Mint:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchMint<config extends Config>(
  config: config,
  parameters: watchMint.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchMint(client, rest)
}

export declare namespace watchMint {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchMint.Parameters

  export type ReturnValue = Actions.token.watchMint.ReturnValue
}

/**
 * Watches for TIP20 token role membership updates.
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
 * const unwatch = Actions.token.watchRole(config, {
 *   onRoleUpdated: (args, log) => {
 *     console.log('Role updated:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRole<config extends Config>(
  config: config,
  parameters: watchRole.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchRole(client, rest)
}

export declare namespace watchRole {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchRole.Parameters
}

/**
 * Watches for TIP20 token transfer events.
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
 * const unwatch = Actions.token.watchTransfer(config, {
 *   onTransfer: (args, log) => {
 *     console.log('Transfer:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchTransfer<config extends Config>(
  config: config,
  parameters: watchTransfer.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchTransfer(client, rest)
}

export declare namespace watchTransfer {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchTransfer.Parameters
}

/**
 * Watches for TIP20 token quote token update events.
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
 * const unwatch = Actions.token.watchUpdateQuoteToken(config, {
 *   onUpdateQuoteToken: (args, log) => {
 *     if (args.completed)
 *       console.log('quote token update completed:', args.newQuoteToken)
 *     else
 *       console.log('quote token update proposed:', args.newQuoteToken)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchUpdateQuoteToken<config extends Config>(
  config: config,
  parameters: watchUpdateQuoteToken.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.token.watchUpdateQuoteToken(client, rest)
}

export declare namespace watchUpdateQuoteToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.token.watchUpdateQuoteToken.Parameters
}
