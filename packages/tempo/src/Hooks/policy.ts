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
import * as Actions from '../Actions/policy.js'

/**
 * Hook for creating a new policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.create(config, variables as never)
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
          Actions.create.ReturnValue,
          Actions.create.ErrorType,
          Actions.create.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.create.ReturnValue,
    Actions.create.ErrorType,
    Actions.create.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.createSync(config, variables as never)
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
          Actions.createSync.ReturnValue,
          Actions.createSync.ErrorType,
          Actions.createSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.createSync.ReturnValue,
    Actions.createSync.ErrorType,
    Actions.createSync.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the admin for a policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.setAdmin(config, variables as never)
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
          Actions.setAdmin.ReturnValue,
          Actions.setAdmin.ErrorType,
          Actions.setAdmin.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setAdmin.ReturnValue,
    Actions.setAdmin.ErrorType,
    Actions.setAdmin.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.setAdminSync(config, variables as never)
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
          Actions.setAdminSync.ReturnValue,
          Actions.setAdminSync.ErrorType,
          Actions.setAdminSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setAdminSync.ReturnValue,
    Actions.setAdminSync.ErrorType,
    Actions.setAdminSync.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy whitelist.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.modifyWhitelist(config, variables as never)
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
          Actions.modifyWhitelist.ReturnValue,
          Actions.modifyWhitelist.ErrorType,
          Actions.modifyWhitelist.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.modifyWhitelist.ReturnValue,
    Actions.modifyWhitelist.ErrorType,
    Actions.modifyWhitelist.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.modifyWhitelistSync(config, variables as never)
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
          Actions.modifyWhitelistSync.ReturnValue,
          Actions.modifyWhitelistSync.ErrorType,
          Actions.modifyWhitelistSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.modifyWhitelistSync.ReturnValue,
    Actions.modifyWhitelistSync.ErrorType,
    Actions.modifyWhitelistSync.Parameters<config>,
    context
  >
}

/**
 * Hook for modifying a policy blacklist.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.modifyBlacklist(config, variables as never)
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
          Actions.modifyBlacklist.ReturnValue,
          Actions.modifyBlacklist.ErrorType,
          Actions.modifyBlacklist.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.modifyBlacklist.ReturnValue,
    Actions.modifyBlacklist.ErrorType,
    Actions.modifyBlacklist.Parameters<config>,
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
 * import { Hooks } from 'tempo.ts/wagmi'
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
      return Actions.modifyBlacklistSync(config, variables as never)
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
          Actions.modifyBlacklistSync.ReturnValue,
          Actions.modifyBlacklistSync.ErrorType,
          Actions.modifyBlacklistSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.modifyBlacklistSync.ReturnValue,
    Actions.modifyBlacklistSync.ErrorType,
    Actions.modifyBlacklistSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting policy data.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.policy.useGetData({
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
export function useGetData<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getData.ReturnValue,
>(parameters: useGetData.Parameters<config, selectData> = {}) {
  const { policyId, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = Actions.getData.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  } as never)
  const enabled = Boolean(policyId !== undefined && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useGetData {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getData.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getData.ReturnValue,
      DefaultError,
      selectData,
      Actions.getData.QueryKey<config>
    > &
    ExactPartial<
      Omit<Actions.getData.queryOptions.Parameters<config, selectData>, 'query'>
    >

  export type ReturnValue<selectData = Actions.getData.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for checking if a user is authorized by a policy.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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
  selectData = Actions.isAuthorized.ReturnValue,
>(parameters: useIsAuthorized.Parameters<config, selectData> = {}) {
  const { policyId, user, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = Actions.isAuthorized.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  } as never)
  const enabled = Boolean(
    policyId !== undefined && user && (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useIsAuthorized {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.isAuthorized.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.isAuthorized.ReturnValue,
      DefaultError,
      selectData,
      Actions.isAuthorized.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.isAuthorized.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<selectData = Actions.isAuthorized.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for watching policy creation events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onPolicyCreated) return
    return Actions.watchCreate(config, {
      ...rest,
      chainId,
      onPolicyCreated,
    })
  }, [config, enabled, onPolicyCreated, rest, chainId])
}

export declare namespace useWatchCreate {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchCreate.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching policy admin update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onAdminUpdated) return
    return Actions.watchAdminUpdated(config, {
      ...rest,
      chainId,
      onAdminUpdated,
    })
  }, [config, enabled, onAdminUpdated, rest, chainId])
}

export declare namespace useWatchAdminUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchAdminUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching whitelist update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onWhitelistUpdated) return
    return Actions.watchWhitelistUpdated(config, {
      ...rest,
      chainId,
      onWhitelistUpdated,
    })
  }, [config, enabled, onWhitelistUpdated, rest, chainId])
}

export declare namespace useWatchWhitelistUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchWhitelistUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching blacklist update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
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

  useEffect(() => {
    if (!enabled) return
    if (!onBlacklistUpdated) return
    return Actions.watchBlacklistUpdated(config, {
      ...rest,
      chainId,
      onBlacklistUpdated,
    })
  }, [config, enabled, onBlacklistUpdated, rest, chainId])
}

export declare namespace useWatchBlacklistUpdated {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchBlacklistUpdated.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
