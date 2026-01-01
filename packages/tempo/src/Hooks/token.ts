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
import * as Actions from '../Actions/token.js'

/**
 * Hook for approving a spender to transfer TIP20 tokens.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useApprove()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ spender: '0x...', amount: 100n })}
 *       disabled={isPending}
 *     >
 *       Approve
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useApprove<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useApprove.Parameters<config, context> = {},
): useApprove.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.approve(config, variables as never)
    },
    mutationKey: ['approve'],
  }) as never
}

export declare namespace useApprove {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.approve.ReturnValue,
          Actions.approve.ErrorType,
          Actions.approve.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.approve.ReturnValue,
    Actions.approve.ErrorType,
    Actions.approve.Parameters<config>,
    context
  >
}

/**
 * Hook for approving a spender to transfer TIP20 tokens.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useApproveSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ spender: '0x...', amount: 100n })}
 *       disabled={isPending}
 *     >
 *       Approve
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useApproveSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useApproveSync.Parameters<config, context> = {},
): useApproveSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.approveSync(config, variables as never)
    },
    mutationKey: ['approveSync'],
  }) as never
}

export declare namespace useApproveSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.approveSync.ReturnValue,
          Actions.approveSync.ErrorType,
          Actions.approveSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.approveSync.ReturnValue,
    Actions.approveSync.ErrorType,
    Actions.approveSync.Parameters<config>,
    context
  >
}

/**
 * Hook for burning TIP20 tokens from the caller's balance.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useBurn()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Burn
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
          Actions.burn.ErrorType,
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
    Actions.burn.ErrorType,
    Actions.burn.Parameters<config>,
    context
  >
}

/**
 * Hook for burning TIP20 tokens from the caller's balance.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useBurnSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Burn
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
          Actions.burnSync.ErrorType,
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
    Actions.burnSync.ErrorType,
    Actions.burnSync.Parameters<config>,
    context
  >
}

/**
 * Hook for burning TIP20 tokens from a blocked address.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useBurnBlocked()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ from: '0x...', amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Burn Blocked
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBurnBlocked<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBurnBlocked.Parameters<config, context> = {},
): useBurnBlocked.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.burnBlocked(config, variables as never)
    },
    mutationKey: ['burnBlocked'],
  }) as never
}

export declare namespace useBurnBlocked {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.burnBlocked.ReturnValue,
          Actions.burnBlocked.ErrorType,
          Actions.burnBlocked.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.burnBlocked.ReturnValue,
    Actions.burnBlocked.ErrorType,
    Actions.burnBlocked.Parameters<config>,
    context
  >
}

/**
 * Hook for burning TIP20 tokens from a blocked address.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useBurnBlockedSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ from: '0x...', amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Burn Blocked
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useBurnBlockedSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useBurnBlockedSync.Parameters<config, context> = {},
): useBurnBlockedSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.burnBlockedSync(config, variables as never)
    },
    mutationKey: ['burnBlockedSync'],
  }) as never
}

export declare namespace useBurnBlockedSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.burnBlockedSync.ReturnValue,
          Actions.burnBlockedSync.ErrorType,
          Actions.burnBlockedSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.burnBlockedSync.ReturnValue,
    Actions.burnBlockedSync.ErrorType,
    Actions.burnBlockedSync.Parameters<config>,
    context
  >
}

/**
 * Hook for changing the transfer policy ID for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useChangeTransferPolicy()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', policyId: 1n })}
 *       disabled={isPending}
 *     >
 *       Change Policy
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useChangeTransferPolicy<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useChangeTransferPolicy.Parameters<config, context> = {},
): useChangeTransferPolicy.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.changeTransferPolicy(config, variables as never)
    },
    mutationKey: ['changeTransferPolicy'],
  }) as never
}

export declare namespace useChangeTransferPolicy {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.changeTransferPolicy.ReturnValue,
          Actions.changeTransferPolicy.ErrorType,
          Actions.changeTransferPolicy.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.changeTransferPolicy.ReturnValue,
    Actions.changeTransferPolicy.ErrorType,
    Actions.changeTransferPolicy.Parameters<config>,
    context
  >
}

/**
 * Hook for changing the transfer policy ID for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useChangeTransferPolicySync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', policyId: 1n })}
 *       disabled={isPending}
 *     >
 *       Change Policy
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useChangeTransferPolicySync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useChangeTransferPolicySync.Parameters<config, context> = {},
): useChangeTransferPolicySync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.changeTransferPolicySync(config, variables as never)
    },
    mutationKey: ['changeTransferPolicySync'],
  }) as never
}

export declare namespace useChangeTransferPolicySync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.changeTransferPolicySync.ReturnValue,
          Actions.changeTransferPolicySync.ErrorType,
          Actions.changeTransferPolicySync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.changeTransferPolicySync.ReturnValue,
    Actions.changeTransferPolicySync.ErrorType,
    Actions.changeTransferPolicySync.Parameters<config>,
    context
  >
}

/**
 * Hook for creating a new TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useCreate()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ name: 'My Token', symbol: 'MTK', currency: 'USD' })}
 *       disabled={isPending}
 *     >
 *       Create Token
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
 * Hook for creating a new TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useCreateSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ name: 'My Token', symbol: 'MTK', currency: 'USD' })}
 *       disabled={isPending}
 *     >
 *       Create Token
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
 * Hook for updating the quote token for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useUpdateQuoteToken()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Update Quote Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useUpdateQuoteToken<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useUpdateQuoteToken.Parameters<config, context> = {},
): useUpdateQuoteToken.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.updateQuoteToken(config, variables as never)
    },
    mutationKey: ['updateQuoteToken'],
  }) as never
}

export declare namespace useUpdateQuoteToken {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.updateQuoteToken.ReturnValue,
          Actions.updateQuoteToken.ErrorType,
          Actions.updateQuoteToken.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.updateQuoteToken.ReturnValue,
    Actions.updateQuoteToken.ErrorType,
    Actions.updateQuoteToken.Parameters<config>,
    context
  >
}

/**
 * Hook for updating the quote token for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useUpdateQuoteTokenSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Update Quote Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useUpdateQuoteTokenSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useUpdateQuoteTokenSync.Parameters<config, context> = {},
): useUpdateQuoteTokenSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.updateQuoteTokenSync(config, variables as never)
    },
    mutationKey: ['updateQuoteTokenSync'],
  }) as never
}

export declare namespace useUpdateQuoteTokenSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.updateQuoteTokenSync.ReturnValue,
          Actions.updateQuoteTokenSync.ErrorType,
          Actions.updateQuoteTokenSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.updateQuoteTokenSync.ReturnValue,
    Actions.updateQuoteTokenSync.ErrorType,
    Actions.updateQuoteTokenSync.Parameters<config>,
    context
  >
}

/**
 * Hook for getting TIP20 token allowance.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.token.useGetAllowance({
 *     account: '0x...',
 *     spender: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Allowance: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with token allowance.
 */
export function useGetAllowance<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getAllowance.ReturnValue,
>(parameters: useGetAllowance.Parameters<config, selectData> = {}) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.getAllowance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useGetAllowance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getAllowance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getAllowance.ReturnValue,
      DefaultError,
      selectData,
      Actions.getAllowance.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.getAllowance.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<selectData = Actions.getAllowance.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting TIP20 token balance for an address.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.token.useGetBalance({
 *     account: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Balance: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with token balance.
 */
export function useGetBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getBalance.ReturnValue,
>(parameters: useGetBalance.Parameters<config, selectData> = {}) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.getBalance.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useGetBalance {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getBalance.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getBalance.ReturnValue,
      DefaultError,
      selectData,
      Actions.getBalance.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.getBalance.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<selectData = Actions.getBalance.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting TIP20 token metadata.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.token.useGetMetadata({
 *     token: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>{data?.name} ({data?.symbol})</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with token metadata.
 */
export function useGetMetadata<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getMetadata.ReturnValue,
>(parameters: useGetMetadata.Parameters<config, selectData> = {}) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.getMetadata.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useGetMetadata {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getMetadata.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getMetadata.ReturnValue,
      DefaultError,
      selectData,
      Actions.getMetadata.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.getMetadata.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<selectData = Actions.getMetadata.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.token.useGetRoleAdmin({
 *     role: 'issuer',
 *     token: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Admin Role: {data}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with admin role hash.
 */
export function useGetRoleAdmin<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.getRoleAdmin.ReturnValue,
>(parameters: useGetRoleAdmin.Parameters<config, selectData>) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.getRoleAdmin.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useGetRoleAdmin {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.getRoleAdmin.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.getRoleAdmin.ReturnValue,
      DefaultError,
      selectData,
      Actions.getRoleAdmin.QueryKey<config>
    > &
    ExactPartial<
      Omit<
        Actions.getRoleAdmin.queryOptions.Parameters<config, selectData>,
        'query'
      >
    >

  export type ReturnValue<selectData = Actions.getRoleAdmin.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for granting roles for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useGrantRoles()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', to: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Grant Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useGrantRoles<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useGrantRoles.Parameters<config, context> = {},
): useGrantRoles.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.grantRoles(config, variables as never)
    },
    mutationKey: ['grantRoles'],
  }) as never
}

export declare namespace useGrantRoles {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.grantRoles.ReturnValue,
          Actions.grantRoles.ErrorType,
          Actions.grantRoles.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.grantRoles.ReturnValue,
    Actions.grantRoles.ErrorType,
    Actions.grantRoles.Parameters<config>,
    context
  >
}

/**
 * Hook for granting roles for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useGrantRolesSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', to: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Grant Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useGrantRolesSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useGrantRolesSync.Parameters<config, context> = {},
): useGrantRolesSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.grantRolesSync(config, variables as never)
    },
    mutationKey: ['grantRolesSync'],
  }) as never
}

export declare namespace useGrantRolesSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.grantRolesSync.ReturnValue,
          Actions.grantRolesSync.ErrorType,
          Actions.grantRolesSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.grantRolesSync.ReturnValue,
    Actions.grantRolesSync.ErrorType,
    Actions.grantRolesSync.Parameters<config>,
    context
  >
}

/**
 * Hook for checking if an account has a specific role for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.token.useHasRole({
 *     account: '0x...',
 *     role: 'issuer',
 *     token: '0x...',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Has Role: {data ? 'Yes' : 'No'}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with boolean indicating if account has role.
 */
export function useHasRole<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.hasRole.ReturnValue,
>(parameters: useHasRole.Parameters<config, selectData>) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.hasRole.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useHasRole {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.hasRole.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.hasRole.ReturnValue,
      DefaultError,
      selectData,
      Actions.hasRole.QueryKey<config>
    > &
    ExactPartial<
      Omit<Actions.hasRole.queryOptions.Parameters<config, selectData>, 'query'>
    >

  export type ReturnValue<selectData = Actions.hasRole.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for minting TIP20 tokens to an address.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useMint()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ to: '0x...', amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Mint
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
          Actions.mint.ErrorType,
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
    Actions.mint.ErrorType,
    Actions.mint.Parameters<config>,
    context
  >
}

/**
 * Hook for minting TIP20 tokens to an address.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useMintSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ to: '0x...', amount: 100n, token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Mint
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
          Actions.mintSync.ErrorType,
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
    Actions.mintSync.ErrorType,
    Actions.mintSync.Parameters<config>,
    context
  >
}

/**
 * Hook for pausing a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.usePause()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Pause
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePause<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePause.Parameters<config, context> = {},
): usePause.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.pause(config, variables as never)
    },
    mutationKey: ['pause'],
  }) as never
}

export declare namespace usePause {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.pause.ReturnValue,
          Actions.pause.ErrorType,
          Actions.pause.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.pause.ReturnValue,
    Actions.pause.ErrorType,
    Actions.pause.Parameters<config>,
    context
  >
}

/**
 * Hook for pausing a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.usePauseSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Pause
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePauseSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePauseSync.Parameters<config, context> = {},
): usePauseSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.pauseSync(config, variables as never)
    },
    mutationKey: ['pauseSync'],
  }) as never
}

export declare namespace usePauseSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.pauseSync.ReturnValue,
          Actions.pauseSync.ErrorType,
          Actions.pauseSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.pauseSync.ReturnValue,
    Actions.pauseSync.ErrorType,
    Actions.pauseSync.Parameters<config>,
    context
  >
}

/**
 * Hook for renouncing roles for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useRenounceRoles()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Renounce Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRenounceRoles<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRenounceRoles.Parameters<config, context> = {},
): useRenounceRoles.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.renounceRoles(config, variables as never)
    },
    mutationKey: ['renounceRoles'],
  }) as never
}

export declare namespace useRenounceRoles {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.renounceRoles.ReturnValue,
          Actions.renounceRoles.ErrorType,
          Actions.renounceRoles.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.renounceRoles.ReturnValue,
    Actions.renounceRoles.ErrorType,
    Actions.renounceRoles.Parameters<config>,
    context
  >
}

/**
 * Hook for renouncing roles for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useRenounceRolesSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Renounce Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRenounceRolesSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRenounceRolesSync.Parameters<config, context> = {},
): useRenounceRolesSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.renounceRolesSync(config, variables as never)
    },
    mutationKey: ['renounceRolesSync'],
  }) as never
}

export declare namespace useRenounceRolesSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.renounceRolesSync.ReturnValue,
          Actions.renounceRolesSync.ErrorType,
          Actions.renounceRolesSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.renounceRolesSync.ReturnValue,
    Actions.renounceRolesSync.ErrorType,
    Actions.renounceRolesSync.Parameters<config>,
    context
  >
}

/**
 * Hook for revoking roles for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useRevokeRoles()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', from: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Revoke Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRevokeRoles<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRevokeRoles.Parameters<config, context> = {},
): useRevokeRoles.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.revokeRoles(config, variables as never)
    },
    mutationKey: ['revokeRoles'],
  }) as never
}

export declare namespace useRevokeRoles {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.revokeRoles.ReturnValue,
          Actions.revokeRoles.ErrorType,
          Actions.revokeRoles.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.revokeRoles.ReturnValue,
    Actions.revokeRoles.ErrorType,
    Actions.revokeRoles.Parameters<config>,
    context
  >
}

/**
 * Hook for revoking roles for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useRevokeRolesSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', from: '0x...', roles: ['issuer'] })}
 *       disabled={isPending}
 *     >
 *       Revoke Roles
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRevokeRolesSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRevokeRolesSync.Parameters<config, context> = {},
): useRevokeRolesSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.revokeRolesSync(config, variables as never)
    },
    mutationKey: ['revokeRolesSync'],
  }) as never
}

export declare namespace useRevokeRolesSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.revokeRolesSync.ReturnValue,
          Actions.revokeRolesSync.ErrorType,
          Actions.revokeRolesSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.revokeRolesSync.ReturnValue,
    Actions.revokeRolesSync.ErrorType,
    Actions.revokeRolesSync.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useSetRoleAdmin()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', role: 'issuer', adminRole: 'pause' })}
 *       disabled={isPending}
 *     >
 *       Set Role Admin
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetRoleAdmin<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetRoleAdmin.Parameters<config, context> = {},
): useSetRoleAdmin.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.setRoleAdmin(config, variables as never)
    },
    mutationKey: ['setRoleAdmin'],
  }) as never
}

export declare namespace useSetRoleAdmin {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.setRoleAdmin.ReturnValue,
          Actions.setRoleAdmin.ErrorType,
          Actions.setRoleAdmin.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setRoleAdmin.ReturnValue,
    Actions.setRoleAdmin.ErrorType,
    Actions.setRoleAdmin.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the admin role for a specific role in a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useSetRoleAdminSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', role: 'issuer', adminRole: 'pause' })}
 *       disabled={isPending}
 *     >
 *       Set Role Admin
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetRoleAdminSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetRoleAdminSync.Parameters<config, context> = {},
): useSetRoleAdminSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.setRoleAdminSync(config, variables as never)
    },
    mutationKey: ['setRoleAdminSync'],
  }) as never
}

export declare namespace useSetRoleAdminSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.setRoleAdminSync.ReturnValue,
          Actions.setRoleAdminSync.ErrorType,
          Actions.setRoleAdminSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setRoleAdminSync.ReturnValue,
    Actions.setRoleAdminSync.ErrorType,
    Actions.setRoleAdminSync.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the supply cap for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useSetSupplyCap()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', supplyCap: 1000000n })}
 *       disabled={isPending}
 *     >
 *       Set Supply Cap
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetSupplyCap<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetSupplyCap.Parameters<config, context> = {},
): useSetSupplyCap.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.setSupplyCap(config, variables as never)
    },
    mutationKey: ['setSupplyCap'],
  }) as never
}

export declare namespace useSetSupplyCap {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.setSupplyCap.ReturnValue,
          Actions.setSupplyCap.ErrorType,
          Actions.setSupplyCap.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setSupplyCap.ReturnValue,
    Actions.setSupplyCap.ErrorType,
    Actions.setSupplyCap.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the supply cap for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useSetSupplyCapSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', supplyCap: 1000000n })}
 *       disabled={isPending}
 *     >
 *       Set Supply Cap
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetSupplyCapSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetSupplyCapSync.Parameters<config, context> = {},
): useSetSupplyCapSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.setSupplyCapSync(config, variables as never)
    },
    mutationKey: ['setSupplyCapSync'],
  }) as never
}

export declare namespace useSetSupplyCapSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.setSupplyCapSync.ReturnValue,
          Actions.setSupplyCapSync.ErrorType,
          Actions.setSupplyCapSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.setSupplyCapSync.ReturnValue,
    Actions.setSupplyCapSync.ErrorType,
    Actions.setSupplyCapSync.Parameters<config>,
    context
  >
}

/**
 * Hook for transferring TIP20 tokens to another address.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useTransfer()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ to: '0x...', amount: 100n })}
 *       disabled={isPending}
 *     >
 *       Transfer
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useTransfer<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useTransfer.Parameters<config, context> = {},
): useTransfer.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.transfer(config, variables as never)
    },
    mutationKey: ['transfer'],
  }) as never
}

export declare namespace useTransfer {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.transfer.ReturnValue,
          Actions.transfer.ErrorType,
          Actions.transfer.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.transfer.ReturnValue,
    Actions.transfer.ErrorType,
    Actions.transfer.Parameters<config>,
    context
  >
}

/**
 * Hook for transferring TIP20 tokens to another address.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useTransferSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ to: '0x...', amount: 100n })}
 *       disabled={isPending}
 *     >
 *       Transfer
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useTransferSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useTransferSync.Parameters<config, context> = {},
): useTransferSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.transferSync(config, variables as never)
    },
    mutationKey: ['transferSync'],
  }) as never
}

export declare namespace useTransferSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.transferSync.ReturnValue,
          Actions.transferSync.ErrorType,
          Actions.transferSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.transferSync.ReturnValue,
    Actions.transferSync.ErrorType,
    Actions.transferSync.Parameters<config>,
    context
  >
}

/**
 * Hook for unpausing a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useUnpause()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Unpause
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useUnpause<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useUnpause.Parameters<config, context> = {},
): useUnpause.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.unpause(config, variables as never)
    },
    mutationKey: ['unpause'],
  }) as never
}

export declare namespace useUnpause {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.unpause.ReturnValue,
          Actions.unpause.ErrorType,
          Actions.unpause.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.unpause.ReturnValue,
    Actions.unpause.ErrorType,
    Actions.unpause.Parameters<config>,
    context
  >
}

/**
 * Hook for unpausing a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.useUnpauseSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Unpause
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useUnpauseSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useUnpauseSync.Parameters<config, context> = {},
): useUnpauseSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.unpauseSync(config, variables as never)
    },
    mutationKey: ['unpauseSync'],
  }) as never
}

export declare namespace useUnpauseSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.unpauseSync.ReturnValue,
          Actions.unpauseSync.ErrorType,
          Actions.unpauseSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.unpauseSync.ReturnValue,
    Actions.unpauseSync.ErrorType,
    Actions.unpauseSync.Parameters<config>,
    context
  >
}

/**
 * Hook for preparing the quote token update for a TIP20 token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.usePrepareUpdateQuoteToken()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', quoteToken: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Prepare Update Quote Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePrepareUpdateQuoteToken<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePrepareUpdateQuoteToken.Parameters<config, context> = {},
): usePrepareUpdateQuoteToken.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.prepareUpdateQuoteToken(config, variables as never)
    },
    mutationKey: ['prepareUpdateQuoteToken'],
  }) as never
}

export declare namespace usePrepareUpdateQuoteToken {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.prepareUpdateQuoteToken.ReturnValue,
          Actions.prepareUpdateQuoteToken.ErrorType,
          Actions.prepareUpdateQuoteToken.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.prepareUpdateQuoteToken.ReturnValue,
    Actions.prepareUpdateQuoteToken.ErrorType,
    Actions.prepareUpdateQuoteToken.Parameters<config>,
    context
  >
}

/**
 * Hook for preparing the quote token update for a TIP20 token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.token.usePrepareUpdateQuoteTokenSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x...', quoteToken: '0x...' })}
 *       disabled={isPending}
 *     >
 *       Prepare Update Quote Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function usePrepareUpdateQuoteTokenSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: usePrepareUpdateQuoteTokenSync.Parameters<config, context> = {},
): usePrepareUpdateQuoteTokenSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.prepareUpdateQuoteTokenSync(config, variables as never)
    },
    mutationKey: ['prepareUpdateQuoteTokenSync'],
  }) as never
}

export declare namespace usePrepareUpdateQuoteTokenSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.prepareUpdateQuoteTokenSync.ReturnValue,
          Actions.prepareUpdateQuoteTokenSync.ErrorType,
          Actions.prepareUpdateQuoteTokenSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.prepareUpdateQuoteTokenSync.ReturnValue,
    Actions.prepareUpdateQuoteTokenSync.ErrorType,
    Actions.prepareUpdateQuoteTokenSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching TIP20 token role admin updates.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchAdminRole({
 *     onRoleAdminUpdated(args) {
 *       console.log('Role admin updated:', args)
 *     },
 *   })
 *
 *   return <div>Watching for role admin updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchAdminRole<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchAdminRole.Parameters<config> = {}) {
  const { enabled = true, onRoleAdminUpdated, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRoleAdminUpdated) return
    if (!token) return
    return Actions.watchAdminRole(config, {
      ...rest,
      chainId,
      onRoleAdminUpdated,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onRoleAdminUpdated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchAdminRole {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchAdminRole.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token approval events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchApprove({
 *     onApproval(args) {
 *       console.log('Approval:', args)
 *     },
 *   })
 *
 *   return <div>Watching for approvals...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchApprove<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchApprove.Parameters<config> = {}) {
  const { enabled = true, onApproval, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onApproval) return
    if (!token) return
    return Actions.watchApprove(config, {
      ...rest,
      chainId,
      onApproval,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onApproval,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchApprove {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchApprove.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token burn events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchBurn({
 *     onBurn(args) {
 *       console.log('Burn:', args)
 *     },
 *   })
 *
 *   return <div>Watching for burns...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchBurn<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchBurn.Parameters<config> = {}) {
  const { enabled = true, onBurn, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onBurn) return
    if (!token) return
    return Actions.watchBurn(config, {
      ...rest,
      chainId,
      onBurn,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onBurn,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchBurn {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchBurn.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching new TIP20 tokens created.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchCreate({
 *     onTokenCreated(args) {
 *       console.log('Token created:', args)
 *     },
 *   })
 *
 *   return <div>Watching for token creations...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchCreate<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchCreate.Parameters<config> = {}) {
  const { enabled = true, onTokenCreated, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onTokenCreated) return
    return Actions.watchCreate(config, {
      ...rest,
      chainId,
      onTokenCreated,
    })
  }, [
    config,
    enabled,
    chainId,
    onTokenCreated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchCreate {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchCreate.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token mint events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchMint({
 *     onMint(args) {
 *       console.log('Mint:', args)
 *     },
 *   })
 *
 *   return <div>Watching for mints...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchMint<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchMint.Parameters<config> = {}) {
  const { enabled = true, onMint, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onMint) return
    if (!token) return
    return Actions.watchMint(config, {
      ...rest,
      chainId,
      onMint,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onMint,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchMint {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchMint.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token role membership updates.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchRole({
 *     onRoleUpdated(args) {
 *       console.log('Role updated:', args)
 *     },
 *   })
 *
 *   return <div>Watching for role updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchRole<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchRole.Parameters<config> = {}) {
  const { enabled = true, onRoleUpdated, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onRoleUpdated) return
    if (!token) return
    return Actions.watchRole(config, {
      ...rest,
      chainId,
      onRoleUpdated,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onRoleUpdated,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchRole {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchRole.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token transfer events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchTransfer({
 *     onTransfer(args) {
 *       console.log('Transfer:', args)
 *     },
 *   })
 *
 *   return <div>Watching for transfers...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchTransfer<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchTransfer.Parameters<config> = {}) {
  const { enabled = true, onTransfer, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onTransfer) return
    if (!token) return
    return Actions.watchTransfer(config, {
      ...rest,
      chainId,
      onTransfer,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onTransfer,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchTransfer {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchTransfer.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}

/**
 * Hook for watching TIP20 token quote token update events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.token.useWatchUpdateQuoteToken({
 *     onUpdateQuoteToken(args) {
 *       if (args.completed)
 *         console.log('quote token update completed:', args.newQuoteToken)
 *       else
 *         console.log('quote token update proposed:', args.newQuoteToken)
 *     },
 *   })
 *
 *   return <div>Watching for quote token updates...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchUpdateQuoteToken<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchUpdateQuoteToken.Parameters<config> = {}) {
  const { enabled = true, onUpdateQuoteToken, token, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onUpdateQuoteToken) return
    if (!token) return
    return Actions.watchUpdateQuoteToken(config, {
      ...rest,
      chainId,
      onUpdateQuoteToken,
      token,
    })
  }, [
    config,
    enabled,
    chainId,
    token,
    onUpdateQuoteToken,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchUpdateQuoteToken {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.watchUpdateQuoteToken.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
