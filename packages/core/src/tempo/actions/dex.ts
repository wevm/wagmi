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

/**
 * Buys a specific amount of tokens.
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
 * const hash = await Actions.dex.buy(config, {
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 *   amountOut: parseUnits('100', 6),
 *   maxAmountIn: parseUnits('105', 6),
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function buy<config extends Config>(
  config: config,
  parameters: buy.Parameters<config>,
): Promise<Actions.dex.buy.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.buy(client, parameters as never)
}

export declare namespace buy {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.buy.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.buy.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.buy.ErrorType
}

/**
 * Buys a specific amount of tokens.
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
 * const result = await Actions.dex.buySync(config, {
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 *   amountOut: parseUnits('100', 6),
 *   maxAmountIn: parseUnits('105', 6),
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function buySync<config extends Config>(
  config: config,
  parameters: buySync.Parameters<config>,
): Promise<Actions.dex.buySync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.buySync(client, parameters as never)
}

export declare namespace buySync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.buySync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.buySync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.buySync.ErrorType
}

/**
 * Cancels an order from the orderbook.
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
 * const hash = await Actions.dex.cancel(config, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function cancel<config extends Config>(
  config: config,
  parameters: cancel.Parameters<config>,
): Promise<Actions.dex.cancel.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.cancel(client, parameters as never)
}

export declare namespace cancel {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.cancel.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.cancel.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.cancel.ErrorType
}

/**
 * Cancels an order from the orderbook.
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
 * const result = await Actions.dex.cancelSync(config, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function cancelSync<config extends Config>(
  config: config,
  parameters: cancelSync.Parameters<config>,
): Promise<Actions.dex.cancelSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.cancelSync(client, parameters as never)
}

export declare namespace cancelSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.cancelSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.cancelSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.cancelSync.ErrorType
}

/**
 * Cancels a stale order from the orderbook.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
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
 * const hash = await Actions.dex.cancelStale(config, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function cancelStale<config extends Config>(
  config: config,
  parameters: cancelStale.Parameters<config>,
): Promise<Actions.dex.cancelStale.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.cancelStale(client, parameters as never)
}

export declare namespace cancelStale {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.cancelStale.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.cancelStale.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.cancelStale.ErrorType
}

/**
 * Cancels a stale order from the orderbook and waits for confirmation.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
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
 * const result = await Actions.dex.cancelStaleSync(config, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function cancelStaleSync<config extends Config>(
  config: config,
  parameters: cancelStaleSync.Parameters<config>,
): Promise<Actions.dex.cancelStaleSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.cancelStaleSync(client, parameters as never)
}

export declare namespace cancelStaleSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.cancelStaleSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.cancelStaleSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.cancelStaleSync.ErrorType
}

/**
 * Creates a new trading pair on the DEX.
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
 * const hash = await Actions.dex.createPair(config, {
 *   base: '0x20c...11',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function createPair<config extends Config>(
  config: config,
  parameters: createPair.Parameters<config>,
): Promise<Actions.dex.createPair.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.createPair(client, parameters as never)
}

export declare namespace createPair {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.createPair.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.createPair.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.createPair.ErrorType
}

/**
 * Creates a new trading pair on the DEX.
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
 * const result = await Actions.dex.createPairSync(config, {
 *   base: '0x20c...11',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function createPairSync<config extends Config>(
  config: config,
  parameters: createPairSync.Parameters<config>,
): Promise<Actions.dex.createPairSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.createPairSync(client, parameters as never)
}

export declare namespace createPairSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.createPairSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.createPairSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.createPairSync.ErrorType
}

/**
 * Gets a user's token balance on the DEX.
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
 * const balance = await Actions.dex.getBalance(config, {
 *   account: '0x...',
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The user's token balance on the DEX.
 */
export function getBalance<config extends Config>(
  config: config,
  parameters: getBalance.Parameters<config>,
): Promise<getBalance.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getBalance(client, rest)
}

export namespace getBalance {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getBalance.Parameters

  export type ReturnValue = Actions.dex.getBalance.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'account'>,
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
      enabled: Boolean(rest.account && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, { account, ...parameters }] = queryKey
        if (!account) throw new Error('account is required.')
        return await getBalance(config, { account, ...parameters })
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getBalance.ReturnValue,
    > = PartialBy<getBalance.Parameters<config>, 'account'> &
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
 * Gets the quote for buying a specific amount of tokens.
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
 * const amountIn = await Actions.dex.getBuyQuote(config, {
 *   amountOut: parseUnits('100', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The amount of tokenIn needed to buy the specified amountOut.
 */
export function getBuyQuote<config extends Config>(
  config: config,
  parameters: getBuyQuote.Parameters<config>,
): Promise<getBuyQuote.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getBuyQuote(client, rest)
}

export namespace getBuyQuote {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getBuyQuote.Parameters

  export type ReturnValue = Actions.dex.getBuyQuote.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getBuyQuote', parameters] as const
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
        rest.tokenIn &&
          rest.tokenOut &&
          rest.amountOut &&
          (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getBuyQuote(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getBuyQuote.ReturnValue,
    > = getBuyQuote.Parameters<config> &
      QueryParameter<
        getBuyQuote.ReturnValue,
        getBuyQuote.ErrorType,
        selectData,
        getBuyQuote.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getBuyQuote.ReturnValue,
    > = QueryOptions<
      getBuyQuote.ReturnValue,
      getBuyQuote.ErrorType,
      selectData,
      getBuyQuote.QueryKey<config>
    >
  }
}

/**
 * Gets an order's details from the orderbook.
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
 * const order = await Actions.dex.getOrder(config, {
 *   orderId: 123n,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The order details.
 */
export function getOrder<config extends Config>(
  config: config,
  parameters: getOrder.Parameters<config>,
): Promise<getOrder.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getOrder(client, rest)
}

export namespace getOrder {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getOrder.Parameters

  export type ReturnValue = Actions.dex.getOrder.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getOrder', parameters] as const
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
      enabled: Boolean(rest.orderId !== undefined && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getOrder(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getOrder.ReturnValue,
    > = getOrder.Parameters<config> &
      QueryParameter<
        getOrder.ReturnValue,
        getOrder.ErrorType,
        selectData,
        getOrder.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getOrder.ReturnValue,
    > = QueryOptions<
      getOrder.ReturnValue,
      getOrder.ErrorType,
      selectData,
      getOrder.QueryKey<config>
    >
  }
}

/**
 * Gets orderbook information for a trading pair.
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
 * const book = await Actions.dex.getOrderbook(config, {
 *   base: '0x20c...11',
 *   quote: '0x20c...20',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The orderbook information.
 */
export function getOrderbook<config extends Config>(
  config: config,
  parameters: getOrderbook.Parameters<config>,
): Promise<getOrderbook.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getOrderbook(client, rest)
}

export namespace getOrderbook {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getOrderbook.Parameters

  export type ReturnValue = Actions.dex.getOrderbook.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getOrderbook', parameters] as const
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
      enabled: Boolean(rest.base && rest.quote && (query?.enabled ?? true)),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getOrderbook(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getOrderbook.ReturnValue,
    > = getOrderbook.Parameters<config> &
      QueryParameter<
        getOrderbook.ReturnValue,
        getOrderbook.ErrorType,
        selectData,
        getOrderbook.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getOrderbook.ReturnValue,
    > = QueryOptions<
      getOrderbook.ReturnValue,
      getOrderbook.ErrorType,
      selectData,
      getOrderbook.QueryKey<config>
    >
  }
}

/**
 * Gets the price level information at a specific tick.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions, Tick } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const level = await Actions.dex.getTickLevel(config, {
 *   base: '0x20c...11',
 *   tick: Tick.fromPrice('1.001'),
 *   isBid: true,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The price level information.
 */
export function getTickLevel<config extends Config>(
  config: config,
  parameters: getTickLevel.Parameters<config>,
): Promise<getTickLevel.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getTickLevel(client, rest)
}

export namespace getTickLevel {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getTickLevel.Parameters

  export type ReturnValue = Actions.dex.getTickLevel.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getTickLevel', parameters] as const
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
        rest.base &&
          rest.tick !== undefined &&
          rest.isBid !== undefined &&
          (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getTickLevel(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getTickLevel.ReturnValue,
    > = getTickLevel.Parameters<config> &
      QueryParameter<
        getTickLevel.ReturnValue,
        getTickLevel.ErrorType,
        selectData,
        getTickLevel.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getTickLevel.ReturnValue,
    > = QueryOptions<
      getTickLevel.ReturnValue,
      getTickLevel.ErrorType,
      selectData,
      getTickLevel.QueryKey<config>
    >
  }
}

/**
 * Gets the quote for selling a specific amount of tokens.
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
 * const amountOut = await Actions.dex.getSellQuote(config, {
 *   amountIn: parseUnits('100', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The amount of tokenOut received for selling the specified amountIn.
 */
export function getSellQuote<config extends Config>(
  config: config,
  parameters: getSellQuote.Parameters<config>,
): Promise<getSellQuote.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.getSellQuote(client, rest)
}

export namespace getSellQuote {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.getSellQuote.Parameters

  export type ReturnValue = Actions.dex.getSellQuote.ReturnValue

  export type ErrorType = BaseErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getSellQuote', parameters] as const
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
        rest.tokenIn &&
          rest.tokenOut &&
          rest.amountIn &&
          (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn({ queryKey }) {
        const [, parameters] = queryKey
        return await getSellQuote(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getSellQuote.ReturnValue,
    > = getSellQuote.Parameters<config> &
      QueryParameter<
        getSellQuote.ReturnValue,
        getSellQuote.ErrorType,
        selectData,
        getSellQuote.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getSellQuote.ReturnValue,
    > = QueryOptions<
      getSellQuote.ReturnValue,
      getSellQuote.ErrorType,
      selectData,
      getSellQuote.QueryKey<config>
    >
  }
}

/**
 * Places a limit order on the orderbook.
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
 * const hash = await Actions.dex.place(config, {
 *   amount: parseUnits('100', 6),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function place<config extends Config>(
  config: config,
  parameters: place.Parameters<config>,
): Promise<Actions.dex.place.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.place(client, parameters as never)
}

export declare namespace place {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.place.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.place.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.place.ErrorType
}

/**
 * Places a flip order that automatically flips when filled.
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
 * const hash = await Actions.dex.placeFlip(config, {
 *   amount: parseUnits('100', 6),
 *   flipTick: Tick.fromPrice('1.01'),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function placeFlip<config extends Config>(
  config: config,
  parameters: placeFlip.Parameters<config>,
): Promise<Actions.dex.placeFlip.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.placeFlip(client, parameters as never)
}

export declare namespace placeFlip {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.placeFlip.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.placeFlip.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.placeFlip.ErrorType
}

/**
 * Places a flip order that automatically flips when filled.
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
 * const result = await Actions.dex.placeFlipSync(config, {
 *   amount: parseUnits('100', 6),
 *   flipTick: Tick.fromPrice('1.01'),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function placeFlipSync<config extends Config>(
  config: config,
  parameters: placeFlipSync.Parameters<config>,
): Promise<Actions.dex.placeFlipSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.placeFlipSync(client, parameters as never)
}

export declare namespace placeFlipSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.placeFlipSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.placeFlipSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.placeFlipSync.ErrorType
}

/**
 * Places a limit order on the orderbook.
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
 * const result = await Actions.dex.placeSync(config, {
 *   amount: parseUnits('100', 6),
 *   tick: Tick.fromPrice('0.99'),
 *   token: '0x20c...11',
 *   type: 'buy',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function placeSync<config extends Config>(
  config: config,
  parameters: placeSync.Parameters<config>,
): Promise<Actions.dex.placeSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.placeSync(client, parameters as never)
}

export declare namespace placeSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.placeSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.placeSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.placeSync.ErrorType
}

/**
 * Sells a specific amount of tokens.
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
 * const hash = await Actions.dex.sell(config, {
 *   amountIn: parseUnits('100', 6),
 *   minAmountOut: parseUnits('95', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function sell<config extends Config>(
  config: config,
  parameters: sell.Parameters<config>,
): Promise<Actions.dex.sell.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.sell(client, parameters as never)
}

export declare namespace sell {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.sell.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.sell.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.sell.ErrorType
}

/**
 * Sells a specific amount of tokens.
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
 * const result = await Actions.dex.sellSync(config, {
 *   amountIn: parseUnits('100', 6),
 *   minAmountOut: parseUnits('95', 6),
 *   tokenIn: '0x20c...11',
 *   tokenOut: '0x20c...20',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function sellSync<config extends Config>(
  config: config,
  parameters: sellSync.Parameters<config>,
): Promise<Actions.dex.sellSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.sellSync(client, parameters as never)
}

export declare namespace sellSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.sellSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.sellSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.sellSync.ErrorType
}

/**
 * Watches for flip order placement events on the DEX.
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
 * const unwatch = Actions.dex.watchFlipOrderPlaced(config, {
 *   onFlipOrderPlaced: (args, log) => {
 *     console.log('Flip order placed:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchFlipOrderPlaced<config extends Config>(
  config: config,
  parameters: watchFlipOrderPlaced.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.watchFlipOrderPlaced(client, rest)
}

export declare namespace watchFlipOrderPlaced {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.watchFlipOrderPlaced.Parameters

  export type Args = Actions.dex.watchFlipOrderPlaced.Args

  export type Log = Actions.dex.watchFlipOrderPlaced.Log
}

/**
 * Watches for order cancellation events on the DEX.
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
 * const unwatch = Actions.dex.watchOrderCancelled(config, {
 *   onOrderCancelled: (args, log) => {
 *     console.log('Order cancelled:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderCancelled<config extends Config>(
  config: config,
  parameters: watchOrderCancelled.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.watchOrderCancelled(client, rest)
}

export declare namespace watchOrderCancelled {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.watchOrderCancelled.Parameters

  export type Args = Actions.dex.watchOrderCancelled.Args

  export type Log = Actions.dex.watchOrderCancelled.Log
}

/**
 * Watches for order filled events on the DEX.
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
 * const unwatch = Actions.dex.watchOrderFilled(config, {
 *   onOrderFilled: (args, log) => {
 *     console.log('Order filled:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderFilled<config extends Config>(
  config: config,
  parameters: watchOrderFilled.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.watchOrderFilled(client, rest)
}

export declare namespace watchOrderFilled {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.watchOrderFilled.Parameters

  export type Args = Actions.dex.watchOrderFilled.Args

  export type Log = Actions.dex.watchOrderFilled.Log
}

/**
 * Watches for order placement events on the DEX.
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
 * const unwatch = Actions.dex.watchOrderPlaced(config, {
 *   onOrderPlaced: (args, log) => {
 *     console.log('Order placed:', args)
 *   },
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchOrderPlaced<config extends Config>(
  config: config,
  parameters: watchOrderPlaced.Parameters<config>,
) {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.dex.watchOrderPlaced(client, rest)
}

export declare namespace watchOrderPlaced {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.dex.watchOrderPlaced.Parameters

  export type Args = Actions.dex.watchOrderPlaced.Args

  export type Log = Actions.dex.watchOrderPlaced.Log
}

/**
 * Withdraws tokens from the DEX to the caller's wallet.
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
 * const hash = await Actions.dex.withdraw(config, {
 *   amount: 100n,
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function withdraw<config extends Config>(
  config: config,
  parameters: withdraw.Parameters<config>,
): Promise<Actions.dex.withdraw.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.withdraw(client, parameters as never)
}

export declare namespace withdraw {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.withdraw.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.withdraw.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.withdraw.ErrorType
}

/**
 * Withdraws tokens from the DEX to the caller's wallet.
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
 * const result = await Actions.dex.withdrawSync(config, {
 *   amount: 100n,
 *   token: '0x20c...11',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export async function withdrawSync<config extends Config>(
  config: config,
  parameters: withdrawSync.Parameters<config>,
): Promise<Actions.dex.withdrawSync.ReturnValue> {
  const { account, chainId, connector } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.dex.withdrawSync(client, parameters as never)
}

export declare namespace withdrawSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.dex.withdrawSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.dex.withdrawSync.ReturnValue

  export type ErrorType = BaseErrorType // TODO: Actions.dex.withdrawSync.ErrorType
}
