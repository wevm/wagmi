import type { DefaultError } from '@tanstack/query-core'
import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial, UnionCompute } from '@wagmi/core/internal'
import { useEffect } from 'react'
import { useChainId, useConfig } from 'wagmi'
import type { ConfigParameter, QueryParameter } from 'wagmi/internal'
import {
  type UseMutationParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from 'wagmi/query'

import {
  buy,
  buySync,
  cancel,
  cancelSync,
  createPair,
  createPairSync,
  getBalance,
  getBuyQuote,
  getOrder,
  getOrderbook,
  getSellQuote,
  getTickLevel,
  place,
  placeFlip,
  placeFlipSync,
  placeSync,
  sell,
  sellSync,
  watchFlipOrderPlaced,
  watchOrderCancelled,
  watchOrderFilled,
  watchOrderPlaced,
  withdraw,
  withdrawSync,
} from '../Actions/dex.js'

/**
 * Hook for buying a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return buy(config, variables as never)
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
          buy.ReturnValue,
          buy.ErrorType,
          buy.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    buy.ReturnValue,
    buy.ErrorType,
    buy.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return buySync(config, variables as never)
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
          buySync.ReturnValue,
          buySync.ErrorType,
          buySync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    buySync.ReturnValue,
    buySync.ErrorType,
    buySync.Parameters<config>,
    context
  >
}

/**
 * Hook for canceling an order from the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return cancel(config, variables as never)
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
          cancel.ReturnValue,
          cancel.ErrorType,
          cancel.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    cancel.ReturnValue,
    cancel.ErrorType,
    cancel.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return cancelSync(config, variables as never)
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
          cancelSync.ReturnValue,
          cancelSync.ErrorType,
          cancelSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    cancelSync.ReturnValue,
    cancelSync.ErrorType,
    cancelSync.Parameters<config>,
    context
  >
}

/**
 * Hook for creating a new trading pair on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return createPair(config, variables as never)
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
          createPair.ReturnValue,
          createPair.ErrorType,
          createPair.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    createPair.ReturnValue,
    createPair.ErrorType,
    createPair.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return createPairSync(config, variables as never)
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
          createPairSync.ReturnValue,
          createPairSync.ErrorType,
          createPairSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    createPairSync.ReturnValue,
    createPairSync.ErrorType,
    createPairSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting a user's token balance on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = getBalance.ReturnValue,
>(parameters: useBalance.Parameters<config, selectData>) {
  const { account, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getBalance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(account && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useBalance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getBalance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getBalance.ReturnValue,
      DefaultError,
      selectData,
      getBalance.QueryKey<config>
    > &
    Omit<getBalance.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getBalance.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the quote for buying a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = getBuyQuote.ReturnValue,
>(parameters: useBuyQuote.Parameters<config, selectData>) {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getBuyQuote.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    parameters.tokenIn &&
      parameters.tokenOut &&
      parameters.amountOut &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useBuyQuote {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getBuyQuote.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getBuyQuote.ReturnValue,
      DefaultError,
      selectData,
      getBuyQuote.QueryKey<config>
    > &
    Omit<getBuyQuote.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getBuyQuote.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting an order's details from the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = getOrder.ReturnValue,
>(parameters: useOrder.Parameters<config, selectData>) {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getOrder.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    parameters.orderId !== undefined && (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useOrder {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getOrder.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getOrder.ReturnValue,
      DefaultError,
      selectData,
      getOrder.QueryKey<config>
    > &
    Omit<getOrder.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getOrder.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting orderbook information for a trading pair.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = getOrderbook.ReturnValue,
>(parameters: useOrderbook.Parameters<config, selectData>) {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getOrderbook.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    parameters.base && parameters.quote && (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useOrderbook {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getOrderbook.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getOrderbook.ReturnValue,
      DefaultError,
      selectData,
      getOrderbook.QueryKey<config>
    > &
    Omit<getOrderbook.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getOrderbook.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the price level information at a specific tick.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.dex.usePriceLevel({
 *     base: '0x20c...11',
 *     tick: Tick.fromPrice('1.001'),
 *     isBid: true,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Price Level: {JSON.stringify(data)}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the price level information.
 */
export function usePriceLevel<
  config extends Config = ResolvedRegister['config'],
  selectData = getTickLevel.ReturnValue,
>(parameters: usePriceLevel.Parameters<config, selectData>) {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTickLevel.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    parameters.base &&
      parameters.tick !== undefined &&
      parameters.isBid !== undefined &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace usePriceLevel {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getTickLevel.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getTickLevel.ReturnValue,
      DefaultError,
      selectData,
      getTickLevel.QueryKey<config>
    > &
    Omit<getTickLevel.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getTickLevel.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the quote for selling a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = getSellQuote.ReturnValue,
>(parameters: useSellQuote.Parameters<config, selectData>) {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getSellQuote.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    parameters.tokenIn &&
      parameters.tokenOut &&
      parameters.amountIn &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useSellQuote {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getSellQuote.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getSellQuote.ReturnValue,
      DefaultError,
      selectData,
      getSellQuote.QueryKey<config>
    > &
    Omit<getSellQuote.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getSellQuote.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for placing a limit order on the orderbook.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return place(config, variables as never)
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
          place.ReturnValue,
          place.ErrorType,
          place.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    place.ReturnValue,
    place.ErrorType,
    place.Parameters<config>,
    context
  >
}

/**
 * Hook for placing a flip order that automatically flips when filled.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return placeFlip(config, variables as never)
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
          placeFlip.ReturnValue,
          placeFlip.ErrorType,
          placeFlip.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    placeFlip.ReturnValue,
    placeFlip.ErrorType,
    placeFlip.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return placeFlipSync(config, variables as never)
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
          placeFlipSync.ReturnValue,
          placeFlipSync.ErrorType,
          placeFlipSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    placeFlipSync.ReturnValue,
    placeFlipSync.ErrorType,
    placeFlipSync.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return placeSync(config, variables as never)
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
          placeSync.ReturnValue,
          placeSync.ErrorType,
          placeSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    placeSync.ReturnValue,
    placeSync.ErrorType,
    placeSync.Parameters<config>,
    context
  >
}

/**
 * Hook for selling a specific amount of tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return sell(config, variables as never)
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
          sell.ReturnValue,
          sell.ErrorType,
          sell.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    sell.ReturnValue,
    sell.ErrorType,
    sell.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return sellSync(config, variables as never)
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
          sellSync.ReturnValue,
          sellSync.ErrorType,
          sellSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    sellSync.ReturnValue,
    sellSync.ErrorType,
    sellSync.Parameters<config>,
    context
  >
}

/**
 * Hook for withdrawing tokens from the DEX to the caller's wallet.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return withdraw(config, variables as never)
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
          withdraw.ReturnValue,
          withdraw.ErrorType,
          withdraw.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    withdraw.ReturnValue,
    withdraw.ErrorType,
    withdraw.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return withdrawSync(config, variables as never)
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
          withdrawSync.ReturnValue,
          withdrawSync.ErrorType,
          withdrawSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    withdrawSync.ReturnValue,
    withdrawSync.ErrorType,
    withdrawSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching flip order placement events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onFlipOrderPlaced) return
    return watchFlipOrderPlaced(config, {
      ...rest,
      chainId,
      onFlipOrderPlaced,
    })
  }, [config, enabled, onFlipOrderPlaced, rest, chainId])
}

export declare namespace useWatchFlipOrderPlaced {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<watchFlipOrderPlaced.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order cancellation events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onOrderCancelled) return
    return watchOrderCancelled(config, {
      ...rest,
      chainId,
      onOrderCancelled,
    })
  }, [config, enabled, onOrderCancelled, rest, chainId])
}

export declare namespace useWatchOrderCancelled {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<watchOrderCancelled.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order filled events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onOrderFilled) return
    return watchOrderFilled(config, {
      ...rest,
      chainId,
      onOrderFilled,
    })
  }, [config, enabled, onOrderFilled, rest, chainId])
}

export declare namespace useWatchOrderFilled {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<watchOrderFilled.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching order placement events on the DEX.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onOrderPlaced) return
    return watchOrderPlaced(config, {
      ...rest,
      chainId,
      onOrderPlaced,
    })
  }, [config, enabled, onOrderPlaced, rest, chainId])
}

export declare namespace useWatchOrderPlaced {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<watchOrderPlaced.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
