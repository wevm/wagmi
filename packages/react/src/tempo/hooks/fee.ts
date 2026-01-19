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
 * Hook for getting the user's default fee token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
  selectData = Actions.fee.getUserToken.ReturnValue,
>(
  parameters: useUserToken.Parameters<config, selectData>,
): useUserToken.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.fee.getUserToken.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useUserToken {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.fee.getUserToken.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.fee.getUserToken.ReturnValue,
      Actions.fee.getUserToken.ErrorType,
      selectData,
      Actions.fee.getUserToken.QueryKey<config>
    > &
    ExactPartial<Actions.fee.getUserToken.Parameters<config>>

  export type ReturnValue<selectData = Actions.fee.getUserToken.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for setting the user's default fee token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.fee.setUserToken(config, variables as never)
    },
    mutationKey: ['setUserToken'],
  }) as never
}

export declare namespace useSetUserToken {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.fee.setUserToken.ReturnValue,
          Actions.fee.setUserToken.ErrorType,
          Actions.fee.setUserToken.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.fee.setUserToken.ReturnValue,
    Actions.fee.setUserToken.ErrorType,
    Actions.fee.setUserToken.Parameters<config>,
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
 * import { Hooks } from 'wagmi/tempo'
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
      return Actions.fee.setUserTokenSync(config, variables as never)
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
          Actions.fee.setUserTokenSync.ReturnValue,
          Actions.fee.setUserTokenSync.ErrorType,
          Actions.fee.setUserTokenSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.fee.setUserTokenSync.ReturnValue,
    Actions.fee.setUserTokenSync.ErrorType,
    Actions.fee.setUserTokenSync.Parameters<config>,
    context
  >
}

/**
 * Hook for watching user token set events.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   Hooks.fee.useWatchSetUserToken({
 *     onUserTokenSet(args) {
 *       console.log('User token set:', args)
 *     },
 *   })
 *
 *   return <div>Watching for user token changes...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchSetUserToken<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchSetUserToken.Parameters<config> = {}) {
  const { enabled = true, onUserTokenSet, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onUserTokenSet) return
    return Actions.fee.watchSetUserToken(config, {
      ...rest,
      chainId,
      onUserTokenSet,
    })
  }, [
    config,
    enabled,
    chainId,
    onUserTokenSet,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchSetUserToken {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.fee.watchSetUserToken.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
