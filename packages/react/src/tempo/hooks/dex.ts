import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial, UnionCompute } from '@wagmi/core/internal'
import { Actions } from '@wagmi/core/tempo'
import { useEffect } from 'react'

import { useChainId } from '../../hooks/useChainId.js'
import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter } from '../../types/properties.js'
import {
  type UseMutationParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from '../../utils/query.js'
import type { QueryParameter } from '../utils.js'

/**
 * Hook for buying a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useBuy()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         tokenIn: '0x20c...11',
 *         tokenOut: '0x20c...20',
 *         amountOut: parseUnits('100', 6),
 *         maxAmountIn: parseUnits('105', 6),
 *       })}
 *       disabled={isPending}
 *     >
 *       Buy Tokens
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBuy<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBuy.Parameters<config, context> = {},
): useBuy.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.buy(config, variables as never)
    },
    mutationKey: ['buy'],
  }) as never
}

export declare namespace useBuy {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.buy.ReturnValue,
          Actions.dex.buy.ErrorType,
          Actions.dex.buy.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.buy.ReturnValue,
    Actions.dex.buy.ErrorType,
    Actions.dex.buy.Parameters<config>,
    context
  >
}

/**
 * Hook for buying a specific amount of tokens.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useBuySync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         tokenIn: '0x20c...11',
 *         tokenOut: '0x20c...20',
 *         amountOut: parseUnits('100', 6),
 *         maxAmountIn: parseUnits('105', 6),
 *       })}
 *       disabled={isPending}
 *     >
 *       Buy Tokens
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBuySync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBuySync.Parameters<config, context> = {},
): useBuySync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.buySync(config, variables as never)
    },
    mutationKey: ['buySync'],
  }) as never
}

export declare namespace useBuySync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.buySync.ReturnValue,
          Actions.dex.buySync.ErrorType,
          Actions.dex.buySync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.buySync.ReturnValue,
    Actions.dex.buySync.ErrorType,
    Actions.dex.buySync.Parameters<config>,
    context
  >
}

/**
 * Hook for canceling an order from the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCancel()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ orderId: 123n })}
 *       disabled={isPending}
 *     >
 *       Cancel Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCancel<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCancel.Parameters<config, context> = {},
): useCancel.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.cancel(config, variables as never)
    },
    mutationKey: ['cancel'],
  }) as never
}

export declare namespace useCancel {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.cancel.ReturnValue,
          Actions.dex.cancel.ErrorType,
          Actions.dex.cancel.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.cancel.ReturnValue,
    Actions.dex.cancel.ErrorType,
    Actions.dex.cancel.Parameters<config>,
    context
  >
}

/**
 * Hook for canceling an order from the orderbook.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCancelSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ orderId: 123n })}
 *       disabled={isPending}
 *     >
 *       Cancel Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCancelSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCancelSync.Parameters<config, context> = {},
): useCancelSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.cancelSync(config, variables as never)
    },
    mutationKey: ['cancelSync'],
  }) as never
}

export declare namespace useCancelSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.cancelSync.ReturnValue,
          Actions.dex.cancelSync.ErrorType,
          Actions.dex.cancelSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.cancelSync.ReturnValue,
    Actions.dex.cancelSync.ErrorType,
    Actions.dex.cancelSync.Parameters<config>,
    context
  >
}

/**
 * Hook for cancelling a stale order from the orderbook.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCancelStale()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ orderId: 123n })}
 *       disabled={isPending}
 *     >
 *       Cancel Stale Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCancelStale<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCancelStale.Parameters<config, context> = {},
): useCancelStale.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.cancelStale(config, variables as never)
    },
    mutationKey: ['cancelStale'],
  }) as never
}

export declare namespace useCancelStale {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.cancelStale.ReturnValue,
          Actions.dex.cancelStale.ErrorType,
          Actions.dex.cancelStale.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.cancelStale.ReturnValue,
    Actions.dex.cancelStale.ErrorType,
    Actions.dex.cancelStale.Parameters<config>,
    context
  >
}

/**
 * Hook for cancelling a stale order and waiting for confirmation.
 *
 * A stale order is one where the owner's balance or allowance has dropped
 * below the order amount.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCancelStaleSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ orderId: 123n })}
 *       disabled={isPending}
 *     >
 *       Cancel Stale Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCancelStaleSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCancelStaleSync.Parameters<config, context> = {},
): useCancelStaleSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.cancelStaleSync(config, variables as never)
    },
    mutationKey: ['cancelStaleSync'],
  }) as never
}

export declare namespace useCancelStaleSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.cancelStaleSync.ReturnValue,
          Actions.dex.cancelStaleSync.ErrorType,
          Actions.dex.cancelStaleSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.cancelStaleSync.ReturnValue,
    Actions.dex.cancelStaleSync.ErrorType,
    Actions.dex.cancelStaleSync.Parameters<config>,
    context
  >
}

/**
 * Hook for creating a new trading pair on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCreatePair()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ base: '0x20c...11' })}
 *       disabled={isPending}
 *     >
 *       Create Pair
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCreatePair<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCreatePair.Parameters<config, context> = {},
): useCreatePair.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.createPair(config, variables as never)
    },
    mutationKey: ['createPair'],
  }) as never
}

export declare namespace useCreatePair {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.createPair.ReturnValue,
          Actions.dex.createPair.ErrorType,
          Actions.dex.createPair.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.createPair.ReturnValue,
    Actions.dex.createPair.ErrorType,
    Actions.dex.createPair.Parameters<config>,
    context
  >
}

/**
 * Hook for creating a new trading pair on the DEX.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useCreatePairSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ base: '0x20c...11' })}
 *       disabled={isPending}
 *     >
 *       Create Pair
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCreatePairSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCreatePairSync.Parameters<config, context> = {},
): useCreatePairSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.createPairSync(config, variables as never)
    },
    mutationKey: ['createPairSync'],
  }) as never
}

export declare namespace useCreatePairSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.createPairSync.ReturnValue,
          Actions.dex.createPairSync.ErrorType,
          Actions.dex.createPairSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.createPairSync.ReturnValue,
    Actions.dex.createPairSync.ErrorType,
    Actions.dex.createPairSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting a user's token balance on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useBalance({
 *     account: '0x...',
 *     token: '0x20c...11',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Balance: {data}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the user's token balance on the DEX.
 */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getBalance.ReturnValue,
>(
  parameters: useBalance.Parameters<config, selectData>,
): useBalance.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getBalance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useBalance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getBalance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getBalance.ReturnValue,
      Actions.dex.getBalance.ErrorType,
      selectData,
      Actions.dex.getBalance.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getBalance.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getBalance.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the quote for buying a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useBuyQuote({
 *     amountOut: parseUnits('100', 6),
 *     tokenIn: '0x20c...11',
 *     tokenOut: '0x20c...20',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Required Input: {data}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the amount of tokenIn needed.
 */
export function useBuyQuote<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getBuyQuote.ReturnValue,
>(
  parameters: useBuyQuote.Parameters<config, selectData>,
): useBuyQuote.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getBuyQuote.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useBuyQuote {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getBuyQuote.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getBuyQuote.ReturnValue,
      Actions.dex.getBuyQuote.ErrorType,
      selectData,
      Actions.dex.getBuyQuote.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getBuyQuote.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getBuyQuote.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting an order's details from the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useOrder({
 *     orderId: 123n,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Order: {JSON.stringify(data)}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the order details.
 */
export function useOrder<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getOrder.ReturnValue,
>(
  parameters: useOrder.Parameters<config, selectData>,
): useOrder.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getOrder.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useOrder {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getOrder.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getOrder.ReturnValue,
      Actions.dex.getOrder.ErrorType,
      selectData,
      Actions.dex.getOrder.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getOrder.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getOrder.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting orderbook information for a trading pair.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useOrderbook({
 *     base: '0x20c...11',
 *     quote: '0x20c...20',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Orderbook: {JSON.stringify(data)}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the orderbook information.
 */
export function useOrderbook<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getOrderbook.ReturnValue,
>(
  parameters: useOrderbook.Parameters<config, selectData>,
): useOrderbook.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getOrderbook.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useOrderbook {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getOrderbook.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getOrderbook.ReturnValue,
      Actions.dex.getOrderbook.ErrorType,
      selectData,
      Actions.dex.getOrderbook.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getOrderbook.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getOrderbook.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the tick level information at a specific tick.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { Tick } from 'viem/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useTickLevel({
 *     base: '0x20c...11',
 *     tick: Tick.fromPrice('1.001'),
 *     isBid: true,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Tick Level: {JSON.stringify(data)}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the tick level information.
 */
export function useTickLevel<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getTickLevel.ReturnValue,
>(
  parameters: useTickLevel.Parameters<config, selectData>,
): useTickLevel.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getTickLevel.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useTickLevel {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getTickLevel.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getTickLevel.ReturnValue,
      Actions.dex.getTickLevel.ErrorType,
      selectData,
      Actions.dex.getTickLevel.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getTickLevel.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getTickLevel.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the quote for selling a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.useSellQuote({
 *     amountIn: parseUnits('100', 6),
 *     tokenIn: '0x20c...11',
 *     tokenOut: '0x20c...20',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Expected Output: {data}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the amount of tokenOut received.
 */
export function useSellQuote<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.dex.getSellQuote.ReturnValue,
>(
  parameters: useSellQuote.Parameters<config, selectData>,
): useSellQuote.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.dex.getSellQuote.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useSellQuote {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.dex.getSellQuote.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.dex.getSellQuote.ReturnValue,
      Actions.dex.getSellQuote.ErrorType,
      selectData,
      Actions.dex.getSellQuote.QueryKey<config>
    > &
    ExactPartial<Actions.dex.getSellQuote.Parameters<config>>

  export type ReturnValue<selectData = Actions.dex.getSellQuote.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for placing a limit order on the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.usePlace()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: parseUnits('100', 6),
 *         tick: Tick.fromPrice('0.99'),
 *         token: '0x20c...11',
 *         type: 'buy',
 *       })}
 *       disabled={isPending}
 *     >
 *       Place Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePlace<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePlace.Parameters<config, context> = {},
): usePlace.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.place(config, variables as never)
    },
    mutationKey: ['place'],
  }) as never
}

export declare namespace usePlace {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.place.ReturnValue,
          Actions.dex.place.ErrorType,
          Actions.dex.place.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.place.ReturnValue,
    Actions.dex.place.ErrorType,
    Actions.dex.place.Parameters<config>,
    context
  >
}

/**
 * Hook for placing a flip order that automatically flips when filled.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.usePlaceFlip()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: parseUnits('100', 6),
 *         flipTick: Tick.fromPrice('1.01'),
 *         tick: Tick.fromPrice('0.99'),
 *         token: '0x20c...11',
 *         type: 'buy',
 *       })}
 *       disabled={isPending}
 *     >
 *       Place Flip Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePlaceFlip<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePlaceFlip.Parameters<config, context> = {},
): usePlaceFlip.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.placeFlip(config, variables as never)
    },
    mutationKey: ['placeFlip'],
  }) as never
}

export declare namespace usePlaceFlip {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.placeFlip.ReturnValue,
          Actions.dex.placeFlip.ErrorType,
          Actions.dex.placeFlip.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.placeFlip.ReturnValue,
    Actions.dex.placeFlip.ErrorType,
    Actions.dex.placeFlip.Parameters<config>,
    context
  >
}

/**
 * Hook for placing a flip order that automatically flips when filled.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.usePlaceFlipSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: parseUnits('100', 6),
 *         flipTick: Tick.fromPrice('1.01'),
 *         tick: Tick.fromPrice('0.99'),
 *         token: '0x20c...11',
 *         type: 'buy',
 *       })}
 *       disabled={isPending}
 *     >
 *       Place Flip Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePlaceFlipSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePlaceFlipSync.Parameters<config, context> = {},
): usePlaceFlipSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.placeFlipSync(config, variables as never)
    },
    mutationKey: ['placeFlipSync'],
  }) as never
}

export declare namespace usePlaceFlipSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.placeFlipSync.ReturnValue,
          Actions.dex.placeFlipSync.ErrorType,
          Actions.dex.placeFlipSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.placeFlipSync.ReturnValue,
    Actions.dex.placeFlipSync.ErrorType,
    Actions.dex.placeFlipSync.Parameters<config>,
    context
  >
}

/**
 * Hook for placing a limit order on the orderbook.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.usePlaceSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: parseUnits('100', 6),
 *         tick: Tick.fromPrice('0.99'),
 *         token: '0x20c...11',
 *         type: 'buy',
 *       })}
 *       disabled={isPending}
 *     >
 *       Place Order
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePlaceSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePlaceSync.Parameters<config, context> = {},
): usePlaceSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.placeSync(config, variables as never)
    },
    mutationKey: ['placeSync'],
  }) as never
}

export declare namespace usePlaceSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.placeSync.ReturnValue,
          Actions.dex.placeSync.ErrorType,
          Actions.dex.placeSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.placeSync.ReturnValue,
    Actions.dex.placeSync.ErrorType,
    Actions.dex.placeSync.Parameters<config>,
    context
  >
}

/**
 * Hook for selling a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useSell()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amountIn: parseUnits('100', 6),
 *         minAmountOut: parseUnits('95', 6),
 *         tokenIn: '0x20c...11',
 *         tokenOut: '0x20c...20',
 *       })}
 *       disabled={isPending}
 *     >
 *       Sell Tokens
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSell<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSell.Parameters<config, context> = {},
): useSell.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.sell(config, variables as never)
    },
    mutationKey: ['sell'],
  }) as never
}

export declare namespace useSell {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.sell.ReturnValue,
          Actions.dex.sell.ErrorType,
          Actions.dex.sell.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.sell.ReturnValue,
    Actions.dex.sell.ErrorType,
    Actions.dex.sell.Parameters<config>,
    context
  >
}

/**
 * Hook for selling a specific amount of tokens.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useSellSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amountIn: parseUnits('100', 6),
 *         minAmountOut: parseUnits('95', 6),
 *         tokenIn: '0x20c...11',
 *         tokenOut: '0x20c...20',
 *       })}
 *       disabled={isPending}
 *     >
 *       Sell Tokens
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSellSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSellSync.Parameters<config, context> = {},
): useSellSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.sellSync(config, variables as never)
    },
    mutationKey: ['sellSync'],
  }) as never
}

export declare namespace useSellSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.sellSync.ReturnValue,
          Actions.dex.sellSync.ErrorType,
          Actions.dex.sellSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.sellSync.ReturnValue,
    Actions.dex.sellSync.ErrorType,
    Actions.dex.sellSync.Parameters<config>,
    context
  >
}

/**
 * Hook for withdrawing tokens from the DEX to the caller's wallet.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useWithdraw()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: 100n,
 *         token: '0x20c...11',
 *       })}
 *       disabled={isPending}
 *     >
 *       Withdraw
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useWithdraw<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useWithdraw.Parameters<config, context> = {},
): useWithdraw.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.withdraw(config, variables as never)
    },
    mutationKey: ['withdraw'],
  }) as never
}

export declare namespace useWithdraw {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.withdraw.ReturnValue,
          Actions.dex.withdraw.ErrorType,
          Actions.dex.withdraw.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.withdraw.ReturnValue,
    Actions.dex.withdraw.ErrorType,
    Actions.dex.withdraw.Parameters<config>,
    context
  >
}

/**
 * Hook for withdrawing tokens from the DEX to the caller's wallet.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.dex.useWithdrawSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({
 *         amount: 100n,
 *         token: '0x20c...11',
 *       })}
 *       disabled={isPending}
 *     >
 *       Withdraw
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useWithdrawSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useWithdrawSync.Parameters<config, context> = {},
): useWithdrawSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.dex.withdrawSync(config, variables as never)
    },
    mutationKey: ['withdrawSync'],
  }) as never
}

export declare namespace useWithdrawSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.dex.withdrawSync.ReturnValue,
          Actions.dex.withdrawSync.ErrorType,
          Actions.dex.withdrawSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.dex.withdrawSync.ReturnValue,
    Actions.dex.withdrawSync.ErrorType,
    Actions.dex.withdrawSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching flip order placement events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.dex.useWatchFlipOrderPlaced({
 *     onFlipOrderPlaced(args) {
 *       console.log('Flip order placed:', args)
 *     },
 *   })
 *
 *   return <div>Watching for flip order placements...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchFlipOrderPlaced<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchFlipOrderPlaced.Parameters<config> = {}) {
  const { enabled = true, onFlipOrderPlaced, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onFlipOrderPlaced) return
    return Actions.dex.watchFlipOrderPlaced(config, {
      ...rest,
      chainId,
      onFlipOrderPlaced,
    })
  }, [
    config,
    enabled,
    chainId,
    onFlipOrderPlaced,
    rest.fromBlock,
    rest.maker,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.token,
  ])
}

export declare namespace useWatchFlipOrderPlaced {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.dex.watchFlipOrderPlaced.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order cancellation events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.dex.useWatchOrderCancelled({
 *     onOrderCancelled(args) {
 *       console.log('Order cancelled:', args)
 *     },
 *   })
 *
 *   return <div>Watching for order cancellations...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchOrderCancelled<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchOrderCancelled.Parameters<config> = {}) {
  const { enabled = true, onOrderCancelled, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onOrderCancelled) return
    return Actions.dex.watchOrderCancelled(config, {
      ...rest,
      chainId,
      onOrderCancelled,
    })
  }, [
    config,
    enabled,
    chainId,
    onOrderCancelled,
    rest.fromBlock,
    rest.onError,
    rest.orderId,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchOrderCancelled {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.dex.watchOrderCancelled.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order filled events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.dex.useWatchOrderFilled({
 *     onOrderFilled(args) {
 *       console.log('Order filled:', args)
 *     },
 *   })
 *
 *   return <div>Watching for order fills...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchOrderFilled<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchOrderFilled.Parameters<config> = {}) {
  const { enabled = true, onOrderFilled, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onOrderFilled) return
    return Actions.dex.watchOrderFilled(config, {
      ...rest,
      chainId,
      onOrderFilled,
    })
  }, [
    config,
    enabled,
    chainId,
    onOrderFilled,
    rest.fromBlock,
    rest.maker,
    rest.onError,
    rest.orderId,
    rest.poll,
    rest.pollingInterval,
    rest.taker,
  ])
}

export declare namespace useWatchOrderFilled {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.dex.watchOrderFilled.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order placement events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.dex.useWatchOrderPlaced({
 *     onOrderPlaced(args) {
 *       console.log('Order placed:', args)
 *     },
 *   })
 *
 *   return <div>Watching for order placements...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchOrderPlaced<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchOrderPlaced.Parameters<config> = {}) {
  const { enabled = true, onOrderPlaced, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onOrderPlaced) return
    return Actions.dex.watchOrderPlaced(config, {
      ...rest,
      chainId,
      onOrderPlaced,
    })
  }, [
    config,
    enabled,
    chainId,
    onOrderPlaced,
    rest.fromBlock,
    rest.maker,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.token,
  ])
}

export declare namespace useWatchOrderPlaced {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.dex.watchOrderPlaced.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
