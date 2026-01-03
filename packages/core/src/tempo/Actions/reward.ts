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
 * Gets the total reward per second rate for all active streams.
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
 * const rate = await Actions.reward.getTotalPerSecond(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The total reward per second (scaled by 1e18).
 */
export function getTotalPerSecond<config extends Config>(
  config: config,
  parameters: getTotalPerSecond.Parameters<config>,
): Promise<getTotalPerSecond.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.getTotalPerSecond(client, rest)
}

export namespace getTotalPerSecond {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.getTotalPerSecond.Parameters

  export type ReturnValue = Actions.reward.getTotalPerSecond.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getTotalPerSecond', parameters] as const
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
        return await getTotalPerSecond(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getTotalPerSecond.ReturnValue,
    > = getTotalPerSecond.Parameters<config> &
      QueryParameter<
        getTotalPerSecond.ReturnValue,
        getTotalPerSecond.ErrorType,
        selectData,
        getTotalPerSecond.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getTotalPerSecond.ReturnValue,
    > = QueryOptions<
      getTotalPerSecond.ReturnValue,
      getTotalPerSecond.ErrorType,
      selectData,
      getTotalPerSecond.QueryKey<config>
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
 * Starts a new reward stream that distributes tokens to opted-in holders.
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
 * const hash = await Actions.reward.start(config, {
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
export async function start<config extends Config>(
  config: config,
  parameters: start.Parameters<config>,
): Promise<Actions.reward.start.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.start(client, parameters as never)
}

export declare namespace start {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.start.Parameters<config['chains'][number], Account>,
        'chain'
      >

  export type ReturnValue = Actions.reward.start.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.start.ErrorType
}

/**
 * Starts a new reward stream that distributes tokens to opted-in holders and waits for confirmation.
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
 * const result = await Actions.reward.startSync(config, {
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
export async function startSync<config extends Config>(
  config: config,
  parameters: startSync.Parameters<config>,
): Promise<Actions.reward.startSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.reward.startSync(client, parameters as never)
}

export declare namespace startSync {
  export type Parameters<config extends Config = Config> =
    ChainIdParameter<config> &
      ConnectorParameter &
      UnionLooseOmit<
        Actions.reward.startSync.Parameters<config['chains'][number], Account>,
        'chain'
      >

  export type ReturnValue = Actions.reward.startSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.reward.startSync.ErrorType
}

/**
 * Watches for reward scheduled events.
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
 * const unwatch = Actions.reward.watchRewardScheduled(config, {
 *   token: '0x20c0000000000000000000000000000000000001',
 *   onRewardScheduled: (args, log) => {
 *     console.log('Reward scheduled:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRewardScheduled<config extends Config>(
  config: config,
  parameters: watchRewardScheduled.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.reward.watchRewardScheduled(client, rest)
}

export declare namespace watchRewardScheduled {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.reward.watchRewardScheduled.Parameters
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
