import type { DefaultError } from '@tanstack/query-core'
import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { useChainId, useConfig } from 'wagmi'
import type { ConfigParameter, QueryParameter } from 'wagmi/internal'
import {
  type UseMutationParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from 'wagmi/query'

import { getUserToken, setUserToken, setUserTokenSync } from '../Actions/fee.js'

/**
 * Hook for getting the user's default fee token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.fee.useUserToken({
 *     account: '0x20c...0055',
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Token: {data?.address}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with token address and ID.
 */
export function useUserToken<
  config extends Config = ResolvedRegister['config'],
  selectData = getUserToken.ReturnValue,
>(parameters: useUserToken.Parameters<config, selectData>) {
  const { account, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getUserToken.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(account && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}

export declare namespace useUserToken {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getUserToken.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getUserToken.ReturnValue,
      DefaultError,
      selectData,
      getUserToken.QueryKey<config>
    > &
    Omit<getUserToken.queryOptions.Parameters<config, selectData>, 'query'>

  export type ReturnValue<selectData = getUserToken.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for setting the user's default fee token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.fee.useSetUserToken()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x20c...0055' })}
 *       disabled={isPending}
 *     >
 *       Set Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetUserToken<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetUserToken.Parameters<config, context> = {},
): useSetUserToken.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return setUserToken(config, variables as never)
    },
    mutationKey: ['setUserTokenSync'],
  }) as never
}

export declare namespace useSetUserToken {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          setUserToken.ReturnValue,
          setUserToken.ErrorType,
          setUserToken.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    setUserToken.ReturnValue,
    setUserToken.ErrorType,
    setUserToken.Parameters<config>,
    context
  >
}

/**
 * Hook for setting the user's default fee token.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.fee.useSetUserTokenSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ token: '0x20c...0055' })}
 *       disabled={isPending}
 *     >
 *       Set Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSetUserTokenSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSetUserTokenSync.Parameters<config, context> = {},
): useSetUserTokenSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return setUserTokenSync(config, variables as never)
    },
    mutationKey: ['setUserTokenSync'],
  }) as never
}

export declare namespace useSetUserTokenSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          setUserTokenSync.ReturnValue,
          setUserTokenSync.ErrorType,
          setUserTokenSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    setUserTokenSync.ReturnValue,
    setUserTokenSync.ErrorType,
    setUserTokenSync.Parameters<config>,
    context
  >
}
