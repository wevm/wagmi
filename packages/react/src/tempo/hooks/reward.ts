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
 * Hook for claiming accumulated rewards.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: claim } = Hooks.reward.useClaim()
 *
 *   return (
 *     <button onClick={() => claim({
 *       token: '0x20c0000000000000000000000000000000000001'
 *     })}>
 *       Claim Rewards
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useClaim<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useClaim.Parameters<config, context> = {},
): useClaim.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.claim(config, variables as never)
    },
    mutationKey: ['claim'],
  }) as never
}

export declare namespace useClaim {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.claim.ReturnValue,
          Actions.reward.claim.ErrorType,
          Actions.reward.claim.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.claim.ReturnValue,
    Actions.reward.claim.ErrorType,
    Actions.reward.claim.Parameters<config>,
    context
  >
}

/**
 * Hook for claiming accumulated rewards and waiting for confirmation.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: claimSync } = Hooks.reward.useClaimSync()
 *
 *   return (
 *     <button onClick={() => claimSync({
 *       token: '0x20c0000000000000000000000000000000000001'
 *     })}>
 *       Claim Rewards
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useClaimSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useClaimSync.Parameters<config, context> = {},
): useClaimSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.claimSync(config, variables as never)
    },
    mutationKey: ['claimSync'],
  }) as never
}

export declare namespace useClaimSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.claimSync.ReturnValue,
          Actions.reward.claimSync.ErrorType,
          Actions.reward.claimSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.claimSync.ReturnValue,
    Actions.reward.claimSync.ErrorType,
    Actions.reward.claimSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting the global reward per token value.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.reward.useGetGlobalRewardPerToken({
 *     token: '0x20c0000000000000000000000000000000000001',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Value: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with global reward per token value.
 */
export function useGetGlobalRewardPerToken<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.reward.getGlobalRewardPerToken.ReturnValue,
>(
  parameters: useGetGlobalRewardPerToken.Parameters<config, selectData> = {},
): useGetGlobalRewardPerToken.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.reward.getGlobalRewardPerToken.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useGetGlobalRewardPerToken {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.reward.getGlobalRewardPerToken.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.reward.getGlobalRewardPerToken.ReturnValue,
      Actions.reward.getGlobalRewardPerToken.ErrorType,
      selectData,
      Actions.reward.getGlobalRewardPerToken.QueryKey<config>
    > &
    ExactPartial<Actions.reward.getGlobalRewardPerToken.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.reward.getGlobalRewardPerToken.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the reward information for a specific account.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.reward.useUserRewardInfo({
 *     token: '0x20c0000000000000000000000000000000000001',
 *     account: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return (
 *     <div>
 *       <div>Recipient: {data?.rewardRecipient}</div>
 *       <div>Reward per token: {data?.rewardPerToken.toString()}</div>
 *       <div>Reward balance: {data?.rewardBalance.toString()}</div>
 *     </div>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with reward information (recipient, rewardPerToken, rewardBalance).
 */
export function useUserRewardInfo<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.reward.getUserRewardInfo.ReturnValue,
>(
  parameters: useUserRewardInfo.Parameters<config, selectData> = {},
): useUserRewardInfo.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.reward.getUserRewardInfo.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useUserRewardInfo {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.reward.getUserRewardInfo.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.reward.getUserRewardInfo.ReturnValue,
      Actions.reward.getUserRewardInfo.ErrorType,
      selectData,
      Actions.reward.getUserRewardInfo.QueryKey<config>
    > &
    ExactPartial<Actions.reward.getUserRewardInfo.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.reward.getUserRewardInfo.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for setting the reward recipient for a token holder.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: setRecipient } = Hooks.reward.useSetRecipient()
 *
 *   return (
 *     <button onClick={() => setRecipient({
 *       recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *       token: '0x20c0000000000000000000000000000000000001',
 *     })}>
 *       Set Recipient
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetRecipient<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetRecipient.Parameters<config, context> = {},
): useSetRecipient.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.setRecipient(config, variables as never)
    },
    mutationKey: ['setRecipient'],
  }) as never
}

export declare namespace useSetRecipient {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.setRecipient.ReturnValue,
          Actions.reward.setRecipient.ErrorType,
          Actions.reward.setRecipient.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.setRecipient.ReturnValue,
    Actions.reward.setRecipient.ErrorType,
    Actions.reward.setRecipient.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the reward recipient and waiting for confirmation.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: setRecipientSync } = Hooks.reward.useSetRecipientSync()
 *
 *   return (
 *     <button onClick={() => setRecipientSync({
 *       recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *       token: '0x20c0000000000000000000000000000000000001',
 *     })}>
 *       Set Recipient
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetRecipientSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetRecipientSync.Parameters<config, context> = {},
): useSetRecipientSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.setRecipientSync(config, variables as never)
    },
    mutationKey: ['setRecipientSync'],
  }) as never
}

export declare namespace useSetRecipientSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.setRecipientSync.ReturnValue,
          Actions.reward.setRecipientSync.ErrorType,
          Actions.reward.setRecipientSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.setRecipientSync.ReturnValue,
    Actions.reward.setRecipientSync.ErrorType,
    Actions.reward.setRecipientSync.Parameters<config>,
    context
  >
}

/**
 * Hook for distributing rewards.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: distribute } = Hooks.reward.useDistribute()
 *
 *   return (
 *     <button onClick={() => distribute({
 *       amount: 100000000000000000000n,
 *       seconds: 86400,
 *       token: '0x20c0000000000000000000000000000000000001',
 *     })}>
 *       Start Reward
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useDistribute<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useDistribute.Parameters<config, context> = {},
): useDistribute.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.distribute(config, variables as never)
    },
    mutationKey: ['distribute'],
  }) as never
}

export declare namespace useDistribute {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.distribute.ReturnValue,
          Actions.reward.distribute.ErrorType,
          Actions.reward.distribute.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.distribute.ReturnValue,
    Actions.reward.distribute.ErrorType,
    Actions.reward.distribute.Parameters<config>,
    context
  >
}

/**
 * Hook for distributing rewards and waiting for confirmation.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: distributeSync } = Hooks.reward.useDistributeSync()
 *
 *   return (
 *     <button onClick={() => distributeSync({
 *       amount: 100000000000000000000n,
 *       seconds: 86400,
 *       token: '0x20c0000000000000000000000000000000000001',
 *     })}>
 *       Start Reward
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useDistributeSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useDistributeSync.Parameters<config, context> = {},
): useDistributeSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.distributeSync(config, variables as never)
    },
    mutationKey: ['distributeSync'],
  }) as never
}

export declare namespace useDistributeSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.distributeSync.ReturnValue,
          Actions.reward.distributeSync.ErrorType,
          Actions.reward.distributeSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.distributeSync.ReturnValue,
    Actions.reward.distributeSync.ErrorType,
    Actions.reward.distributeSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching reward distributed events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.reward.useWatchRewardDistributed({
 *     token: '0x20c0000000000000000000000000000000000001',
 *     onRewardDistributed(args) {
 *       console.log('Reward distributed:', args)
 *     },
 *   })
 *
 *   return <div>Watching for reward distributed events...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchRewardDistributed<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchRewardDistributed.Parameters<config> = {}) {
  const { enabled = true, onRewardDistributed, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRewardDistributed) return
    if (!token) return
    return Actions.reward.watchRewardDistributed(config, {
      ...rest,
      chainId,
      onRewardDistributed,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onRewardDistributed,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchRewardDistributed {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.reward.watchRewardDistributed.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching reward recipient set events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.reward.useWatchRewardRecipientSet({
 *     token: '0x20c0000000000000000000000000000000000001',
 *     onRewardRecipientSet(args) {
 *       console.log('Reward recipient set:', args)
 *     },
 *   })
 *
 *   return <div>Watching for reward recipient set events...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchRewardRecipientSet<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchRewardRecipientSet.Parameters<config> = {}) {
  const { enabled = true, onRewardRecipientSet, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRewardRecipientSet) return
    if (!token) return
    return Actions.reward.watchRewardRecipientSet(config, {
      ...rest,
      chainId,
      onRewardRecipientSet,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onRewardRecipientSet,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchRewardRecipientSet {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.reward.watchRewardRecipientSet.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
