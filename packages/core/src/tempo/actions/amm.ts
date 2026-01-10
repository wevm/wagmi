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
import { filterQueryOptions } from './utils.js'

/**
 * Gets the reserves for a liquidity pool.
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
 * const pool = await Actions.amm.getPool(config, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The pool reserves.
 */
export function getPool<config extends Config>(
  config: config,
  parameters: getPool.Parameters<config>,
): Promise<getPool.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.amm.getPool(client, rest)
}

export namespace getPool {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.amm.getPool.Parameters

  export type ReturnValue = Actions.amm.getPool.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getPool', filterQueryOptions(parameters)] as const
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
        rest.userToken && rest.validatorToken && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getPool(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getPool.ReturnValue,
    > = getPool.Parameters<config> &
      QueryParameter<
        getPool.ReturnValue,
        getPool.ErrorType,
        selectData,
        getPool.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getPool.ReturnValue,
    > = QueryOptions<
      getPool.ReturnValue,
      getPool.ErrorType,
      selectData,
      getPool.QueryKey<config>
    >
  }
}

/**
 * Gets the LP token balance for an account in a specific pool.
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
 * const poolId = await Actions.amm.getPoolId(config, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const balance = await Actions.amm.getLiquidityBalance(config, {
 *   poolId,
 *   address: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The LP token balance.
 */
export function getLiquidityBalance<config extends Config>(
  config: config,
  parameters: getLiquidityBalance.Parameters<config>,
): Promise<getLiquidityBalance.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.amm.getLiquidityBalance(client, rest)
}

export namespace getLiquidityBalance {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.amm.getLiquidityBalance.Parameters

  export type ReturnValue = Actions.amm.getLiquidityBalance.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getLiquidityBalance', filterQueryOptions(parameters)] as const
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
        rest.address &&
          (rest.poolId ||
            (rest.userToken !== undefined &&
              rest.validatorToken !== undefined)) &&
          (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getLiquidityBalance(config, parameters as any)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getLiquidityBalance.ReturnValue,
    > = getLiquidityBalance.Parameters<config> &
      QueryParameter<
        getLiquidityBalance.ReturnValue,
        getLiquidityBalance.ErrorType,
        selectData,
        getLiquidityBalance.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getLiquidityBalance.ReturnValue,
    > = QueryOptions<
      getLiquidityBalance.ReturnValue,
      getLiquidityBalance.ErrorType,
      selectData,
      getLiquidityBalance.QueryKey<config>
    >
  }
}

/**
 * Performs a rebalance swap from validator token to user token.
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
 * const hash = await Actions.amm.rebalanceSwap(config, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function rebalanceSwap<config extends Config>(
  config: config,
  parameters: rebalanceSwap.Parameters<config>,
): Promise<Actions.amm.rebalanceSwap.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.rebalanceSwap(client, parameters as never)
}

export declare namespace rebalanceSwap {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.rebalanceSwap.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.amm.rebalanceSwap.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Performs a rebalance swap from validator token to user token.
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
 * const result = await Actions.amm.rebalanceSwapSync(config, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function rebalanceSwapSync<config extends Config>(
  config: config,
  parameters: rebalanceSwapSync.Parameters<config>,
): Promise<Actions.amm.rebalanceSwapSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.rebalanceSwapSync(client, parameters as never)
}

export declare namespace rebalanceSwapSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.rebalanceSwapSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.amm.rebalanceSwapSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Adds liquidity to a pool.
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
 * const hash = await Actions.amm.mint(config, {
 *   userTokenAddress: '0x20c0...beef',
 *   validatorTokenAddress: '0x20c0...babe',
 *   validatorTokenAmount: 100n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function mint<config extends Config>(
  config: config,
  parameters: mint.Parameters<config>,
): Promise<Actions.amm.mint.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.mint(client, parameters as never)
}

export declare namespace mint {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.mint.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.amm.mint.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Adds liquidity to a pool.
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
 * const result = await Actions.amm.mintSync(config, {
 *   userTokenAddress: '0x20c0...beef',
 *   validatorTokenAddress: '0x20c0...babe',
 *   validatorTokenAmount: 100n,
 *   to: '0xfeed...fede',
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
): Promise<Actions.amm.mintSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.mintSync(client, parameters as never)
}

export declare namespace mintSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.mintSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.amm.mintSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Removes liquidity from a pool.
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
 * const hash = await Actions.amm.burn(config, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burn<config extends Config>(
  config: config,
  parameters: burn.Parameters<config>,
): Promise<Actions.amm.burn.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.burn(client, parameters as never)
}

export declare namespace burn {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.burn.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.amm.burn.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Removes liquidity from a pool.
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
 * const result = await Actions.amm.burnSync(config, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
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
): Promise<Actions.amm.burnSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.amm.burnSync(client, parameters as never)
}

export declare namespace burnSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.amm.burnSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.amm.burnSync.ReturnValue

  export type ErrorType = BaseErrorType
}

/**
 * Watches for rebalance swap events.
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
 * const unwatch = Actions.amm.watchRebalanceSwap(config, {
 *   onRebalanceSwap: (args, log) => {
 *     console.log('Rebalance swap:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRebalanceSwap<config extends Config>(
  config: config,
  parameters: watchRebalanceSwap.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.amm.watchRebalanceSwap(client, rest)
}

export declare namespace watchRebalanceSwap {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.amm.watchRebalanceSwap.Parameters
}

/**
 * Watches for liquidity mint events.
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
 * const unwatch = Actions.amm.watchMint(config, {
 *   onMint: (args, log) => {
 *     console.log('Liquidity added:', args)
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
  return Actions.amm.watchMint(client, rest)
}

export declare namespace watchMint {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.amm.watchMint.Parameters
}

/**
 * Watches for liquidity burn events.
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
 * const unwatch = Actions.amm.watchBurn(config, {
 *   onBurn: (args, log) => {
 *     console.log('Liquidity removed:', args)
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
  return Actions.amm.watchBurn(client, rest)
}

export declare namespace watchBurn {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.amm.watchBurn.Parameters
}
