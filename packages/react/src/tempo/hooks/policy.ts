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
 * Hook for creating a new policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useCreate()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ type: 'whitelist' })}
 *       disabled={isPending}
 *     >
 *       Create Policy
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCreate<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCreate.Parameters<config, context> = {},
): useCreate.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.create(config, variables as never)
    },
    mutationKey: ['create'],
  }) as never
}

export declare namespace useCreate {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.create.ReturnValue,
          Actions.policy.create.ErrorType,
          Actions.policy.create.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.create.ReturnValue,
    Actions.policy.create.ErrorType,
    Actions.policy.create.Parameters<config>,
    context
  >
}

/**
 * Hook for creating a new policy.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useCreateSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ type: 'whitelist' })}
 *       disabled={isPending}
 *     >
 *       Create Policy
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useCreateSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useCreateSync.Parameters<config, context> = {},
): useCreateSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.createSync(config, variables as never)
    },
    mutationKey: ['createSync'],
  }) as never
}

export declare namespace useCreateSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.createSync.ReturnValue,
          Actions.policy.createSync.ErrorType,
          Actions.policy.createSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.createSync.ReturnValue,
    Actions.policy.createSync.ErrorType,
    Actions.policy.createSync.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the admin for a policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useSetAdmin()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, admin: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Set Admin
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetAdmin<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetAdmin.Parameters<config, context> = {},
): useSetAdmin.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.setAdmin(config, variables as never)
    },
    mutationKey: ['setAdmin'],
  }) as never
}

export declare namespace useSetAdmin {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.setAdmin.ReturnValue,
          Actions.policy.setAdmin.ErrorType,
          Actions.policy.setAdmin.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.setAdmin.ReturnValue,
    Actions.policy.setAdmin.ErrorType,
    Actions.policy.setAdmin.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the admin for a policy.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useSetAdminSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, admin: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Set Admin
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetAdminSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetAdminSync.Parameters<config, context> = {},
): useSetAdminSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.setAdminSync(config, variables as never)
    },
    mutationKey: ['setAdminSync'],
  }) as never
}

export declare namespace useSetAdminSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.setAdminSync.ReturnValue,
          Actions.policy.setAdminSync.ErrorType,
          Actions.policy.setAdminSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.setAdminSync.ReturnValue,
    Actions.policy.setAdminSync.ErrorType,
    Actions.policy.setAdminSync.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy whitelist.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useModifyWhitelist()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, address: '0x...', allowed: true })}
 *       disabled={isPending}
 *     >
 *       Add to Whitelist
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useModifyWhitelist<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useModifyWhitelist.Parameters<config, context> = {},
): useModifyWhitelist.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.modifyWhitelist(config, variables as never)
    },
    mutationKey: ['modifyWhitelist'],
  }) as never
}

export declare namespace useModifyWhitelist {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.modifyWhitelist.ReturnValue,
          Actions.policy.modifyWhitelist.ErrorType,
          Actions.policy.modifyWhitelist.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.modifyWhitelist.ReturnValue,
    Actions.policy.modifyWhitelist.ErrorType,
    Actions.policy.modifyWhitelist.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy whitelist.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useModifyWhitelistSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, address: '0x...', allowed: true })}
 *       disabled={isPending}
 *     >
 *       Add to Whitelist
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useModifyWhitelistSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useModifyWhitelistSync.Parameters<config, context> = {},
): useModifyWhitelistSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.modifyWhitelistSync(config, variables as never)
    },
    mutationKey: ['modifyWhitelistSync'],
  }) as never
}

export declare namespace useModifyWhitelistSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.modifyWhitelistSync.ReturnValue,
          Actions.policy.modifyWhitelistSync.ErrorType,
          Actions.policy.modifyWhitelistSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.modifyWhitelistSync.ReturnValue,
    Actions.policy.modifyWhitelistSync.ErrorType,
    Actions.policy.modifyWhitelistSync.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy blacklist.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useModifyBlacklist()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, address: '0x...', restricted: true })}
 *       disabled={isPending}
 *     >
 *       Add to Blacklist
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useModifyBlacklist<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useModifyBlacklist.Parameters<config, context> = {},
): useModifyBlacklist.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.modifyBlacklist(config, variables as never)
    },
    mutationKey: ['modifyBlacklist'],
  }) as never
}

export declare namespace useModifyBlacklist {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.modifyBlacklist.ReturnValue,
          Actions.policy.modifyBlacklist.ErrorType,
          Actions.policy.modifyBlacklist.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.modifyBlacklist.ReturnValue,
    Actions.policy.modifyBlacklist.ErrorType,
    Actions.policy.modifyBlacklist.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy blacklist.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.policy.useModifyBlacklistSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ policyId: 2n, address: '0x...', restricted: true })}
 *       disabled={isPending}
 *     >
 *       Add to Blacklist
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useModifyBlacklistSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useModifyBlacklistSync.Parameters<config, context> = {},
): useModifyBlacklistSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.policy.modifyBlacklistSync(config, variables as never)
    },
    mutationKey: ['modifyBlacklistSync'],
  }) as never
}

export declare namespace useModifyBlacklistSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.policy.modifyBlacklistSync.ReturnValue,
          Actions.policy.modifyBlacklistSync.ErrorType,
          Actions.policy.modifyBlacklistSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.policy.modifyBlacklistSync.ReturnValue,
    Actions.policy.modifyBlacklistSync.ErrorType,
    Actions.policy.modifyBlacklistSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting policy data.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.policy.useData({
 *     policyId: 2n,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Admin: {data?.admin}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with policy data.
 */
export function useData<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.policy.getData.ReturnValue,
>(
  parameters: useData.Parameters<config, selectData> = {},
): useData.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.policy.getData.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useData {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.policy.getData.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.policy.getData.ReturnValue,
      Actions.policy.getData.ErrorType,
      selectData,
      Actions.policy.getData.QueryKey<config>
    > &
    ExactPartial<Actions.policy.getData.Parameters<config>>

  export type ReturnValue<selectData = Actions.policy.getData.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for checking if a user is authorized by a policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.policy.useIsAuthorized({
 *     policyId: 2n,
 *     user: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Authorized: {data ? 'Yes' : 'No'}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with authorization status.
 */
export function useIsAuthorized<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.policy.isAuthorized.ReturnValue,
>(
  parameters: useIsAuthorized.Parameters<config, selectData> = {},
): useIsAuthorized.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.policy.isAuthorized.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useIsAuthorized {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.policy.isAuthorized.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.policy.isAuthorized.ReturnValue,
      Actions.policy.isAuthorized.ErrorType,
      selectData,
      Actions.policy.isAuthorized.QueryKey<config>
    > &
    ExactPartial<Actions.policy.isAuthorized.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.policy.isAuthorized.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for watching policy creation events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.policy.useWatchCreate({
 *     onPolicyCreated(args) {
 *       console.log('Policy created:', args)
 *     },
 *   })
 *
 *   return <div>Watching for policy creation...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchCreate<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchCreate.Parameters<config> = {}) {
  const { enabled = true, onPolicyCreated, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onPolicyCreated) return
    return Actions.policy.watchCreate(config, {
      ...rest,
      chainId,
      onPolicyCreated,
    })
  }, [
    config,
    enabled,
    chainId,
    onPolicyCreated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchCreate {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.policy.watchCreate.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching policy admin update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.policy.useWatchAdminUpdated({
 *     onAdminUpdated(args) {
 *       console.log('Policy admin updated:', args)
 *     },
 *   })
 *
 *   return <div>Watching for admin updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchAdminUpdated<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchAdminUpdated.Parameters<config> = {}) {
  const { enabled = true, onAdminUpdated, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onAdminUpdated) return
    return Actions.policy.watchAdminUpdated(config, {
      ...rest,
      chainId,
      onAdminUpdated,
    })
  }, [
    config,
    enabled,
    chainId,
    onAdminUpdated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchAdminUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.policy.watchAdminUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching whitelist update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.policy.useWatchWhitelistUpdated({
 *     onWhitelistUpdated(args) {
 *       console.log('Whitelist updated:', args)
 *     },
 *   })
 *
 *   return <div>Watching for whitelist updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchWhitelistUpdated<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchWhitelistUpdated.Parameters<config> = {}) {
  const { enabled = true, onWhitelistUpdated, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onWhitelistUpdated) return
    return Actions.policy.watchWhitelistUpdated(config, {
      ...rest,
      chainId,
      onWhitelistUpdated,
    })
  }, [
    config,
    enabled,
    chainId,
    onWhitelistUpdated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchWhitelistUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.policy.watchWhitelistUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching blacklist update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.policy.useWatchBlacklistUpdated({
 *     onBlacklistUpdated(args) {
 *       console.log('Blacklist updated:', args)
 *     },
 *   })
 *
 *   return <div>Watching for blacklist updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchBlacklistUpdated<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchBlacklistUpdated.Parameters<config> = {}) {
  const { enabled = true, onBlacklistUpdated, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onBlacklistUpdated) return
    return Actions.policy.watchBlacklistUpdated(config, {
      ...rest,
      chainId,
      onBlacklistUpdated,
    })
  }, [
    config,
    enabled,
    chainId,
    onBlacklistUpdated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchBlacklistUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.policy.watchBlacklistUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
