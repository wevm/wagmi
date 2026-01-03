import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial, UnionCompute } from '@wagmi/core/internal'
import { Actions } from '@wagmi/core/tempo'
import { useEffect } from 'react'

import { useChainId } from '../../hooks/useChainId.js'
import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import {
  type UseMutationParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from '../../utils/query.js'

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
 * Hook for getting the total reward per second rate.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.reward.useGetTotalPerSecond({
 *     token: '0x20c0000000000000000000000000000000000001',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Rate: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with total reward per second.
 */
export function useGetTotalPerSecond<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.reward.getTotalPerSecond.ReturnValue,
>(
  parameters: useGetTotalPerSecond.Parameters<config, selectData> = {},
): useGetTotalPerSecond.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.reward.getTotalPerSecond.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useGetTotalPerSecond {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.reward.getTotalPerSecond.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.reward.getTotalPerSecond.ReturnValue,
      Actions.reward.getTotalPerSecond.ErrorType,
      selectData,
      Actions.reward.getTotalPerSecond.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.reward.getTotalPerSecond.queryOptions.Parameters<
          config,
          selectData
        >,
        'query'
      >
    >

  export type ReturnValue<
    selectData = Actions.reward.getTotalPerSecond.ReturnValue,
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
    ExactPartial<
      Omit<
        Actions.reward.getUserRewardInfo.queryOptions.Parameters<
          config,
          selectData
        >,
        'query'
      >
    >

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
 * Hook for starting a new reward stream.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: start } = Hooks.reward.useStart()
 *
 *   return (
 *     <button onClick={() => start({
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
export function useStart<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useStart.Parameters<config, context> = {},
): useStart.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.start(config, variables as never)
    },
    mutationKey: ['start'],
  }) as never
}

export declare namespace useStart {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.start.ReturnValue,
          Actions.reward.start.ErrorType,
          Actions.reward.start.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.start.ReturnValue,
    Actions.reward.start.ErrorType,
    Actions.reward.start.Parameters<config>,
    context
  >
}

/**
 * Hook for starting a new reward stream and waiting for confirmation.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate: startSync } = Hooks.reward.useStartSync()
 *
 *   return (
 *     <button onClick={() => startSync({
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
export function useStartSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useStartSync.Parameters<config, context> = {},
): useStartSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.reward.startSync(config, variables as never)
    },
    mutationKey: ['startSync'],
  }) as never
}

export declare namespace useStartSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.reward.startSync.ReturnValue,
          Actions.reward.startSync.ErrorType,
          Actions.reward.startSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.reward.startSync.ReturnValue,
    Actions.reward.startSync.ErrorType,
    Actions.reward.startSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching reward scheduled events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.reward.useWatchRewardScheduled({
 *     token: '0x20c0000000000000000000000000000000000001',
 *     onRewardScheduled(args) {
 *       console.log('Reward scheduled:', args)
 *     },
 *   })
 *
 *   return <div>Watching for reward scheduled events...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchRewardScheduled<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchRewardScheduled.Parameters<config> = {}) {
  const { enabled = true, onRewardScheduled, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRewardScheduled) return
    if (!token) return
    return Actions.reward.watchRewardScheduled(config, {
      ...rest,
      chainId,
      onRewardScheduled,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onRewardScheduled,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchRewardScheduled {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.reward.watchRewardScheduled.Parameters<config>> &
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
