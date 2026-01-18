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
 * Adds a new validator (owner only).
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
 * const hash = await Actions.validator.add(config, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   active: true,
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function add<config extends Config>(
  config: config,
  parameters: add.Parameters<config>,
): Promise<Actions.validator.add.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.add(client, parameters as never)
}

export declare namespace add {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.add.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.validator.add.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Adds a new validator (owner only) and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.addSync(config, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   active: true,
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function addSync<config extends Config>(
  config: config,
  parameters: addSync.Parameters<config>,
): Promise<Actions.validator.addSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.addSync(client, parameters as never)
}

export declare namespace addSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.addSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.validator.addSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Changes the owner of the validator config precompile.
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
 * const hash = await Actions.validator.changeOwner(config, {
 *   newOwner: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function changeOwner<config extends Config>(
  config: config,
  parameters: changeOwner.Parameters<config>,
): Promise<Actions.validator.changeOwner.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.changeOwner(client, parameters as never)
}

export declare namespace changeOwner {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.changeOwner.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.changeOwner.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Changes the owner of the validator config precompile and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.changeOwnerSync(config, {
 *   newOwner: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function changeOwnerSync<config extends Config>(
  config: config,
  parameters: changeOwnerSync.Parameters<config>,
): Promise<Actions.validator.changeOwnerSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.changeOwnerSync(client, parameters as never)
}

export declare namespace changeOwnerSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.changeOwnerSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.changeOwnerSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Changes the active status of a validator (owner only).
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
 * const hash = await Actions.validator.changeStatus(config, {
 *   validator: '0x...',
 *   active: false,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function changeStatus<config extends Config>(
  config: config,
  parameters: changeStatus.Parameters<config>,
): Promise<Actions.validator.changeStatus.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.changeStatus(client, parameters as never)
}

export declare namespace changeStatus {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.changeStatus.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.changeStatus.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Changes the active status of a validator and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.changeStatusSync(config, {
 *   validator: '0x...',
 *   active: false,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function changeStatusSync<config extends Config>(
  config: config,
  parameters: changeStatusSync.Parameters<config>,
): Promise<Actions.validator.changeStatusSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.changeStatusSync(client, parameters as never)
}

export declare namespace changeStatusSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.changeStatusSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.changeStatusSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Updates validator information (only callable by the validator themselves).
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
 * const hash = await Actions.validator.update(config, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function update<config extends Config>(
  config: config,
  parameters: update.Parameters<config>,
): Promise<Actions.validator.update.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.update(client, parameters as never)
}

export declare namespace update {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.update.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.validator.update.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Updates validator information and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.updateSync(config, {
 *   newValidatorAddress: '0x...',
 *   publicKey: '0x...',
 *   inboundAddress: '192.168.1.1:8080',
 *   outboundAddress: '192.168.1.1:8080',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function updateSync<config extends Config>(
  config: config,
  parameters: updateSync.Parameters<config>,
): Promise<Actions.validator.updateSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.updateSync(client, parameters as never)
}

export declare namespace updateSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.updateSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.updateSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Sets the next epoch for a full DKG ceremony.
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
 * const hash = await Actions.validator.setNextFullDkgCeremony(config, {
 *   epoch: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function setNextFullDkgCeremony<config extends Config>(
  config: config,
  parameters: setNextFullDkgCeremony.Parameters<config>,
): Promise<Actions.validator.setNextFullDkgCeremony.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.setNextFullDkgCeremony(client, parameters as never)
}

export declare namespace setNextFullDkgCeremony {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.setNextFullDkgCeremony.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.validator.setNextFullDkgCeremony.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Sets the next epoch for a full DKG ceremony and waits for the transaction receipt.
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
 * const { receipt } = await Actions.validator.setNextFullDkgCeremonySync(config, {
 *   epoch: 100n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function setNextFullDkgCeremonySync<config extends Config>(
  config: config,
  parameters: setNextFullDkgCeremonySync.Parameters<config>,
): Promise<Actions.validator.setNextFullDkgCeremonySync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.validator.setNextFullDkgCeremonySync(
    client,
    parameters as never,
  )
}

export declare namespace setNextFullDkgCeremonySync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.validator.setNextFullDkgCeremonySync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue =
    Actions.validator.setNextFullDkgCeremonySync.ReturnValue

  export type ErrorType = BaseErrorType
}

// Read functions

/**
 * Returns the list of all validators.
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
 * const validators = await Actions.validator.getAll(config, {})
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The list of validators.
 */
export function getAll<config extends Config>(
  config: config,
  parameters: getAll.Parameters<config>,
): Promise<getAll.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.validator.getAll(client, rest)
}

export namespace getAll {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.validator.getAll.Parameters

  export type ReturnValue = Actions.validator.getAll.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['validator.getAll', parameters] as const
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
      enabled: query?.enabled ?? true,
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getAll(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getAll.ReturnValue,
    > = getAll.Parameters<config> &
      QueryParameter<
        getAll.ReturnValue,
        getAll.ErrorType,
        selectData,
        getAll.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getAll.ReturnValue,
    > = QueryOptions<
      getAll.ReturnValue,
      getAll.ErrorType,
      selectData,
      getAll.QueryKey<config>
    >
  }
}

/**
 * Returns information about a specific validator.
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
 * const validator = await Actions.validator.get(config, {
 *   validator: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The validator information.
 */
export function get<config extends Config>(
  config: config,
  parameters: get.Parameters<config>,
): Promise<get.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.validator.get(client, rest)
}

export namespace get {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.validator.get.Parameters

  export type ReturnValue = Actions.validator.get.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['validator.get', parameters] as const
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
      enabled: Boolean(rest.validator && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await get(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = get.ReturnValue,
    > = get.Parameters<config> &
      QueryParameter<
        get.ReturnValue,
        get.ErrorType,
        selectData,
        get.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = get.ReturnValue,
    > = QueryOptions<
      get.ReturnValue,
      get.ErrorType,
      selectData,
      get.QueryKey<config>
    >
  }
}

/**
 * Returns the current owner of the validator config precompile.
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
 * const owner = await Actions.validator.getOwner(config, {})
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The owner address.
 */
export function getOwner<config extends Config>(
  config: config,
  parameters: getOwner.Parameters<config>,
): Promise<getOwner.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.validator.getOwner(client, rest)
}

export namespace getOwner {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.validator.getOwner.Parameters

  export type ReturnValue = Actions.validator.getOwner.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['validator.getOwner', parameters] as const
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
      enabled: query?.enabled ?? true,
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getOwner(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getOwner.ReturnValue,
    > = getOwner.Parameters<config> &
      QueryParameter<
        getOwner.ReturnValue,
        getOwner.ErrorType,
        selectData,
        getOwner.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getOwner.ReturnValue,
    > = QueryOptions<
      getOwner.ReturnValue,
      getOwner.ErrorType,
      selectData,
      getOwner.QueryKey<config>
    >
  }
}

/**
 * Returns the total number of validators.
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
 * const count = await Actions.validator.getCount(config, {})
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The validator count.
 */
export function getCount<config extends Config>(
  config: config,
  parameters: getCount.Parameters<config>,
): Promise<getCount.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.validator.getCount(client, rest)
}

export namespace getCount {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.validator.getCount.Parameters

  export type ReturnValue = Actions.validator.getCount.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['validator.getCount', parameters] as const
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
      enabled: query?.enabled ?? true,
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getCount(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getCount.ReturnValue,
    > = getCount.Parameters<config> &
      QueryParameter<
        getCount.ReturnValue,
        getCount.ErrorType,
        selectData,
        getCount.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getCount.ReturnValue,
    > = QueryOptions<
      getCount.ReturnValue,
      getCount.ErrorType,
      selectData,
      getCount.QueryKey<config>
    >
  }
}

/**
 * Returns the next epoch for a full DKG ceremony.
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
 * const epoch = await Actions.validator.getNextFullDkgCeremony(config, {})
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The next DKG ceremony epoch.
 */
export function getNextFullDkgCeremony<config extends Config>(
  config: config,
  parameters: getNextFullDkgCeremony.Parameters<config>,
): Promise<getNextFullDkgCeremony.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.validator.getNextFullDkgCeremony(client, rest)
}

export namespace getNextFullDkgCeremony {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.validator.getNextFullDkgCeremony.Parameters

  export type ReturnValue = Actions.validator.getNextFullDkgCeremony.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['validator.getNextFullDkgCeremony', parameters] as const
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
      enabled: query?.enabled ?? true,
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getNextFullDkgCeremony(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getNextFullDkgCeremony.ReturnValue,
    > = getNextFullDkgCeremony.Parameters<config> &
      QueryParameter<
        getNextFullDkgCeremony.ReturnValue,
        getNextFullDkgCeremony.ErrorType,
        selectData,
        getNextFullDkgCeremony.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getNextFullDkgCeremony.ReturnValue,
    > = QueryOptions<
      getNextFullDkgCeremony.ReturnValue,
      getNextFullDkgCeremony.ErrorType,
      selectData,
      getNextFullDkgCeremony.QueryKey<config>
    >
  }
}
