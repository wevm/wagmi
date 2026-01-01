import type { DefaultError } from '@tanstack/query-core'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial, UnionCompute } from '@wagmi/core/internal'
import { useEffect } from 'react'
import { useChainId, useConfig } from 'wagmi'
import type { ConfigParameter, QueryParameter } from 'wagmi/internal'
import { type UseQueryReturnType, useQuery } from 'wagmi/query'
import { getNonce, watchNonceIncremented } from '../Actions/nonce.js'

/**
 * Hook for getting the nonce for an account and nonce key.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   const { data, isLoading } = Hooks.nonce.useNonce({
 *     account: '0x...',
 *     nonceKey: 1n,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Nonce: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with nonce value.
 */
export function useNonce<
  config extends Config = ResolvedRegister['config'],
  selectData = getNonce.ReturnValue,
>(parameters: useNonce.Parameters<config, selectData> = {}) {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getNonce.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options)
}

export declare namespace useNonce {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = getNonce.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      getNonce.ReturnValue,
      DefaultError,
      selectData,
      getNonce.QueryKey<config>
    > &
    ExactPartial<
      Omit<getNonce.queryOptions.Parameters<config, selectData>, 'query'>
    >

  export type ReturnValue<selectData = getNonce.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for watching nonce incremented events.
 *
 * @deprecated This function has been deprecated post-AllegroModerato. It will be removed in a future version.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'tempo.ts/wagmi'
 *
 * function App() {
 *   Hooks.nonce.useWatchNonceIncremented({
 *     onNonceIncremented(args, log) {
 *       console.log('Nonce incremented:', args)
 *     },
 *   })
 *
 *   return <div>Watching for nonce increments...</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 */
export function useWatchNonceIncremented<
  config extends Config = ResolvedRegister['config'],
>(parameters: useWatchNonceIncremented.Parameters<config> = {}) {
  const { enabled = true, onNonceIncremented, ...rest } = parameters

  const config = useConfig({ config: parameters.config })
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onNonceIncremented) return
    return watchNonceIncremented(config, {
      ...rest,
      chainId,
      onNonceIncremented,
    })
  }, [config, enabled, onNonceIncremented, chainId, rest])
}

export declare namespace useWatchNonceIncremented {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<watchNonceIncremented.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
