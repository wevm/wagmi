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
 * Claims accumulated rewards for a recipient.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.reward.claim(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function claim<config extends Config>(
  config: config,
  parameters: claim.Parameters<config>,
): Promise<Actions.reward.claim.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.claim(client, parameters as never)
}

export declare namespace claim {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.claim.Parameters<config['chains'][number], Account>,
        'chain'
      >

  export type ReturnValue = Actions.reward.claim.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.claim.ErrorType
}

/**
 * Claims accumulated rewards for a recipient and waits for confirmation.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.reward.claimSync(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function claimSync<config extends Config>(
  config: config,
  parameters: claimSync.Parameters<config>,
): Promise<Actions.reward.claimSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.claimSync(client, parameters as never)
}

export declare namespace claimSync {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.claimSync.Parameters<config['chains'][number], Account>,
        'chain'
      >

  export type ReturnValue = Actions.reward.claimSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.claimSync.ErrorType
}

/**
 * Gets the global reward per token value for a token.
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
 * const value = await Actions.reward.getGlobalRewardPerToken(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The global reward per token value (scaled by 1e18).
 */
export function getGlobalRewardPerToken<config extends Config>(
  config: config,
  parameters: getGlobalRewardPerToken.Parameters<config>,
): Promise<getGlobalRewardPerToken.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.getGlobalRewardPerToken(client, rest)
}

export namespace getGlobalRewardPerToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.getGlobalRewardPerToken.Parameters

  export type ReturnValue = Actions.reward.getGlobalRewardPerToken.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getGlobalRewardPerToken', parameters] as const
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
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getGlobalRewardPerToken(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getGlobalRewardPerToken.ReturnValue,
    > = getGlobalRewardPerToken.Parameters<config> &
      QueryParameter<
        getGlobalRewardPerToken.ReturnValue,
        getGlobalRewardPerToken.ErrorType,
        selectData,
        getGlobalRewardPerToken.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getGlobalRewardPerToken.ReturnValue,
    > = QueryOptions<
      getGlobalRewardPerToken.ReturnValue,
      getGlobalRewardPerToken.ErrorType,
      selectData,
      getGlobalRewardPerToken.QueryKey<config>
    >
  }
}

/**
 * Gets the reward information for a specific account.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const info = await Actions.reward.getUserRewardInfo(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 *   account: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The user's reward information (recipient, rewardPerToken, rewardBalance).
 */
export function getUserRewardInfo<config extends Config>(
  config: config,
  parameters: getUserRewardInfo.Parameters<config>,
): Promise<getUserRewardInfo.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.getUserRewardInfo(client, rest)
}

export namespace getUserRewardInfo {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.getUserRewardInfo.Parameters

  export type ReturnValue = Actions.reward.getUserRewardInfo.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getUserRewardInfo', parameters] as const
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
      enabled: Boolean(rest.token && rest.account && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getUserRewardInfo(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getUserRewardInfo.ReturnValue,
    > = getUserRewardInfo.Parameters<config> &
      QueryParameter<
        getUserRewardInfo.ReturnValue,
        getUserRewardInfo.ErrorType,
        selectData,
        getUserRewardInfo.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getUserRewardInfo.ReturnValue,
    > = QueryOptions<
      getUserRewardInfo.ReturnValue,
      getUserRewardInfo.ErrorType,
      selectData,
      getUserRewardInfo.QueryKey<config>
    >
  }
}

/**
 * Sets or changes the reward recipient for a token holder.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.reward.setRecipient(config, {
 *   recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setRecipient<config extends Config>(
  config: config,
  parameters: setRecipient.Parameters<config>,
): Promise<Actions.reward.setRecipient.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.setRecipient(client, parameters as never)
}

export declare namespace setRecipient {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.setRecipient.Parameters<
          config['chains'][number],
          Account
        >,
        'chain'
      >

  export type ReturnValue = Actions.reward.setRecipient.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.setRecipient.ErrorType
}

/**
 * Sets or changes the reward recipient for a token holder and waits for confirmation.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.reward.setRecipientSync(config, {
 *   recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function setRecipientSync<config extends Config>(
  config: config,
  parameters: setRecipientSync.Parameters<config>,
): Promise<Actions.reward.setRecipientSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.setRecipientSync(client, parameters as never)
}

export declare namespace setRecipientSync {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.setRecipientSync.Parameters<
          config['chains'][number],
          Account
        >,
        'chain'
      >

  export type ReturnValue = Actions.reward.setRecipientSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.setRecipientSync.ErrorType
}

/**
 * Distributes tokens to opted-in holders.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.reward.distribute(config, {
 *   amount: 100000000000000000000n,
 *   seconds: 86400,
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function distribute<config extends Config>(
  config: config,
  parameters: distribute.Parameters<config>,
): Promise<Actions.reward.distribute.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.distribute(client, parameters as never)
}

export declare namespace distribute {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.distribute.Parameters<config['chains'][number], Account>,
        'chain'
      >

  export type ReturnValue = Actions.reward.distribute.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.distribute.ErrorType
}

/**
 * Distributes tokens to opted-in holders and waits for confirmation.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.reward.distributeSync(config, {
 *   amount: 100000000000000000000n,
 *   seconds: 86400,
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function distributeSync<config extends Config>(
  config: config,
  parameters: distributeSync.Parameters<config>,
): Promise<Actions.reward.distributeSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.distributeSync(client, parameters as never)
}

export declare namespace distributeSync {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.distributeSync.Parameters<
          config['chains'][number],
          Account
        >,
        'chain'
      >

  export type ReturnValue = Actions.reward.distributeSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.distributeSync.ErrorType
}

/**
 * Watches for reward distributed events.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const unwatch = Actions.reward.watchRewardDistributed(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 *   onRewardDistributed: (args, log) => {
 *     console.log('Reward distributed:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRewardDistributed<config extends Config>(
  config: config,
  parameters: watchRewardDistributed.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.watchRewardDistributed(client, rest)
}

export declare namespace watchRewardDistributed {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.watchRewardDistributed.Parameters
}

/**
 * Watches for reward recipient set events.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const unwatch = Actions.reward.watchRewardRecipientSet(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 *   onRewardRecipientSet: (args, log) => {
 *     console.log('Reward recipient set:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRewardRecipientSet<config extends Config>(
  config: config,
  parameters: watchRewardRecipientSet.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.watchRewardRecipientSet(client, rest)
}

export declare namespace watchRewardRecipientSet {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.watchRewardRecipientSet.Parameters
}
