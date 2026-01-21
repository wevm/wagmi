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
 * Hook for getting the reserves for a liquidity pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
  selectData = Actions.amm.getPool.ReturnValue,
>(
  parameters: usePool.Parameters<config, selectData> = {},
): usePool.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.amm.getPool.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace usePool {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.amm.getPool.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.amm.getPool.ReturnValue,
      Actions.amm.getPool.ErrorType,
      selectData,
      Actions.amm.getPool.QueryKey<config>
    > &
    ExactPartial<Actions.amm.getPool.Parameters<config>>

  export type ReturnValue<selectData = Actions.amm.getPool.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the LP token balance for an account in a specific pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
  selectData = Actions.amm.getLiquidityBalance.ReturnValue,
>(
  parameters: useLiquidityBalance.Parameters<config, selectData> = {},
): useLiquidityBalance.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.amm.getLiquidityBalance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useLiquidityBalance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.amm.getLiquidityBalance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.amm.getLiquidityBalance.ReturnValue,
      Actions.amm.getLiquidityBalance.ErrorType,
      selectData,
      Actions.amm.getLiquidityBalance.QueryKey<config>
    > &
    ExactPartial<Actions.amm.getLiquidityBalance.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.amm.getLiquidityBalance.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for performing a rebalance swap from validator token to user token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.rebalanceSwap(config, variables as never)
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
          Actions.amm.rebalanceSwap.ReturnValue,
          Actions.amm.rebalanceSwap.ErrorType,
          Actions.amm.rebalanceSwap.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.rebalanceSwap.ReturnValue,
    Actions.amm.rebalanceSwap.ErrorType,
    Actions.amm.rebalanceSwap.Parameters<config>,
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
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.rebalanceSwapSync(config, variables as never)
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
          Actions.amm.rebalanceSwapSync.ReturnValue,
          Actions.amm.rebalanceSwapSync.ErrorType,
          Actions.amm.rebalanceSwapSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.rebalanceSwapSync.ReturnValue,
    Actions.amm.rebalanceSwapSync.ErrorType,
    Actions.amm.rebalanceSwapSync.Parameters<config>,
    context
  >
}

/**
 * Hook for adding liquidity to a pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.mint(config, variables as never)
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
          Actions.amm.mint.ReturnValue,
          Actions.amm.mint.ErrorType,
          Actions.amm.mint.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.mint.ReturnValue,
    Actions.amm.mint.ErrorType,
    Actions.amm.mint.Parameters<config>,
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
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.mintSync(config, variables as never)
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
          Actions.amm.mintSync.ReturnValue,
          Actions.amm.mintSync.ErrorType,
          Actions.amm.mintSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.mintSync.ReturnValue,
    Actions.amm.mintSync.ErrorType,
    Actions.amm.mintSync.Parameters<config>,
    context
  >
}

/**
 * Hook for removing liquidity from a pool.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.burn(config, variables as never)
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
          Actions.amm.burn.ReturnValue,
          Actions.amm.burn.ErrorType,
          Actions.amm.burn.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.burn.ReturnValue,
    Actions.amm.burn.ErrorType,
    Actions.amm.burn.Parameters<config>,
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
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.amm.burnSync(config, variables as never)
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
          Actions.amm.burnSync.ReturnValue,
          Actions.amm.burnSync.ErrorType,
          Actions.amm.burnSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.amm.burnSync.ReturnValue,
    Actions.amm.burnSync.ErrorType,
    Actions.amm.burnSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching rebalance swap events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRebalanceSwap) return
    return Actions.amm.watchRebalanceSwap(config, {
      ...rest,
      chainId,
      onRebalanceSwap,
    })
  }, [
    config,
    enabled,
    chainId,
    onRebalanceSwap,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.userToken,
    rest.validatorToken,
  ])
}

export declare namespace useWatchRebalanceSwap {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.amm.watchRebalanceSwap.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching liquidity mint events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onMint) return
    return Actions.amm.watchMint(config, {
      ...rest,
      chainId,
      onMint,
    })
  }, [
    config,
    enabled,
    chainId,
    onMint,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.sender,
    rest.userToken,
    rest.validatorToken,
  ])
}

export declare namespace useWatchMint {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.amm.watchMint.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching liquidity burn events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onBurn) return
    return Actions.amm.watchBurn(config, {
      ...rest,
      chainId,
      onBurn,
    })
  }, [
    config,
    enabled,
    chainId,
    onBurn,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.userToken,
    rest.validatorToken,
  ])
}

export declare namespace useWatchBurn {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.amm.watchBurn.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
