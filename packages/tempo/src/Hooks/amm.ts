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
import * as Actions from '../Actions/amm.js'

/**
 * Hook for getting the reserves for a liquidity pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.amm.usePool({
 *     userToken: '0x...',
 *     validatorToken: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return (
 *     <div>
 *       User Token Reserve: {data?.reserveUserToken.toString()}
 *       Validator Token Reserve: {data?.reserveValidatorToken.toString()}
 *     </div>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the pool reserves.
 */
export function usePool<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getPool.ReturnValue,
>(parameters: usePool.Parameters<config, selectData>) {
  const { userToken, validatorToken, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = Actions.getPool.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  } as never)
  const enabled = Boolean(
    userToken !== undefined &&
      validatorToken !== undefined &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace usePool {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getPool.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getPool.ReturnValue,
      DefaultError,
      selectData,
      Actions.getPool.QueryKey<config>
    > &
    ExactPartial<
      Omit<Actions.getPool.queryOptions.Parameters<config, selectData>, 'query'>
    >

  export type ReturnValue<selectData = Actions.getPool.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the LP token balance for an account in a specific pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data: poolId } = Hooks.amm.usePoolId({
 *     userToken: '0x...',
 *     validatorToken: '0x...',
 *   })
 *
 *   const { data, isLoading } = Hooks.amm.useLiquidityBalance({
 *     poolId,
 *     address: '0x20c...0055',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>LP Balance: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the LP token balance.
 */
export function useLiquidityBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getLiquidityBalance.ReturnValue,
>(parameters: useLiquidityBalance.Parameters<config, selectData> = {}) {
  const { address, poolId, userToken, validatorToken, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = Actions.getLiquidityBalance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  } as never)
  const enabled = Boolean(
    address &&
      (poolId || (userToken !== undefined && validatorToken !== undefined)) &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useLiquidityBalance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getLiquidityBalance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getLiquidityBalance.ReturnValue,
      DefaultError,
      selectData,
      Actions.getLiquidityBalance.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.getLiquidityBalance.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<
    selectData = Actions.getLiquidityBalance.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for performing a rebalance swap from validator token to user token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useRebalanceSwap()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userToken: '0x...',
 *           validatorToken: '0x...',
 *           amountOut: 100n,
 *           to: '0x...',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Rebalance Swap
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRebalanceSwap<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRebalanceSwap.Parameters<config, context> = {},
): useRebalanceSwap.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.rebalanceSwap(config, variables as never)
    },
    mutationKey: ['rebalanceSwap'],
  }) as never
}

export declare namespace useRebalanceSwap {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.rebalanceSwap.ReturnValue,
          DefaultError,
          Actions.rebalanceSwap.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.rebalanceSwap.ReturnValue,
    DefaultError,
    Actions.rebalanceSwap.Parameters<config>,
    context
  >
}

/**
 * Hook for performing a rebalance swap from validator token to user token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useRebalanceSwapSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userToken: '0x...',
 *           validatorToken: '0x...',
 *           amountOut: 100n,
 *           to: '0x...',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Rebalance Swap
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRebalanceSwapSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRebalanceSwapSync.Parameters<config, context> = {},
): useRebalanceSwapSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.rebalanceSwapSync(config, variables as never)
    },
    mutationKey: ['rebalanceSwapSync'],
  }) as never
}

export declare namespace useRebalanceSwapSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.rebalanceSwapSync.ReturnValue,
          DefaultError,
          Actions.rebalanceSwapSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.rebalanceSwapSync.ReturnValue,
    DefaultError,
    Actions.rebalanceSwapSync.Parameters<config>,
    context
  >
}

/**
 * Hook for adding liquidity to a pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useMint()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userTokenAddress: '0x20c0...beef',
 *           validatorTokenAddress: '0x20c0...babe',
 *           validatorTokenAmount: 100n,
 *           to: '0xfeed...fede',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Add Liquidity
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useMint<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMint.Parameters<config, context> = {},
): useMint.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.mint(config, variables as never)
    },
    mutationKey: ['mint'],
  }) as never
}

export declare namespace useMint {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.mint.ReturnValue,
          DefaultError,
          Actions.mint.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.mint.ReturnValue,
    DefaultError,
    Actions.mint.Parameters<config>,
    context
  >
}

/**
 * Hook for adding liquidity to a pool.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useMintSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userTokenAddress: '0x20c0...beef',
 *           validatorTokenAddress: '0x20c0...babe',
 *           validatorTokenAmount: 100n,
 *           to: '0xfeed...fede',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Add Liquidity
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useMintSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useMintSync.Parameters<config, context> = {},
): useMintSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.mintSync(config, variables as never)
    },
    mutationKey: ['mintSync'],
  }) as never
}

export declare namespace useMintSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.mintSync.ReturnValue,
          DefaultError,
          Actions.mintSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.mintSync.ReturnValue,
    DefaultError,
    Actions.mintSync.Parameters<config>,
    context
  >
}

/**
 * Hook for removing liquidity from a pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useBurn()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userToken: '0x20c0...beef',
 *           validatorToken: '0x20c0...babe',
 *           liquidity: 50n,
 *           to: '0xfeed...fede',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Remove Liquidity
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBurn<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBurn.Parameters<config, context> = {},
): useBurn.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.burn(config, variables as never)
    },
    mutationKey: ['burn'],
  }) as never
}

export declare namespace useBurn {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.burn.ReturnValue,
          DefaultError,
          Actions.burn.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.burn.ReturnValue,
    DefaultError,
    Actions.burn.Parameters<config>,
    context
  >
}

/**
 * Hook for removing liquidity from a pool.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.amm.useBurnSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           userToken: '0x20c0...beef',
 *           validatorToken: '0x20c0...babe',
 *           liquidity: 50n,
 *           to: '0xfeed...fede',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Remove Liquidity
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBurnSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBurnSync.Parameters<config, context> = {},
): useBurnSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.burnSync(config, variables as never)
    },
    mutationKey: ['burnSync'],
  }) as never
}

export declare namespace useBurnSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.burnSync.ReturnValue,
          DefaultError,
          Actions.burnSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.burnSync.ReturnValue,
    DefaultError,
    Actions.burnSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching rebalance swap events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.amm.useWatchRebalanceSwap({
 *     onRebalanceSwap(args) {
 *       console.log('Rebalance swap:', args)
 *     },
 *   })
 *
 *   return <div>Watching for rebalance swaps...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchRebalanceSwap<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchRebalanceSwap.Parameters<config> = {}) {
  const { enabled = true, onRebalanceSwap, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onRebalanceSwap) return
    return Actions.watchRebalanceSwap(config, {
      ...rest,
      chainId,
      onRebalanceSwap,
    })
  }, [config, enabled, onRebalanceSwap, rest, chainId])
}

export declare namespace useWatchRebalanceSwap {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchRebalanceSwap.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching fee swap events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.amm.useWatchFeeSwap({
 *     onFeeSwap(args) {
 *       console.log('Fee swap:', args)
 *     },
 *   })
 *
 *   return <div>Watching for fee swaps...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchFeeSwap<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchFeeSwap.Parameters<config> = {}) {
  const { enabled = true, onFeeSwap, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onFeeSwap) return
    return Actions.watchFeeSwap(config, {
      ...rest,
      chainId,
      onFeeSwap,
    })
  }, [config, enabled, onFeeSwap, rest, chainId])
}

export declare namespace useWatchFeeSwap {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchFeeSwap.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching liquidity mint events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.amm.useWatchMint({
 *     onMint(args) {
 *       console.log('Liquidity added:', args)
 *     },
 *   })
 *
 *   return <div>Watching for liquidity additions...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchMint<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchMint.Parameters<config> = {}) {
  const { enabled = true, onMint, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onMint) return
    return Actions.watchMint(config, {
      ...rest,
      chainId,
      onMint,
    })
  }, [config, enabled, onMint, rest, chainId])
}

export declare namespace useWatchMint {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchMint.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching liquidity burn events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.amm.useWatchBurn({
 *     onBurn(args) {
 *       console.log('Liquidity removed:', args)
 *     },
 *   })
 *
 *   return <div>Watching for liquidity removals...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchBurn<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchBurn.Parameters<config> = {}) {
  const { enabled = true, onBurn, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onBurn) return
    return Actions.watchBurn(config, {
      ...rest,
      chainId,
      onBurn,
    })
  }, [config, enabled, onBurn, rest, chainId])
}

export declare namespace useWatchBurn {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchBurn.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
