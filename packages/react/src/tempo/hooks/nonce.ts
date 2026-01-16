import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial, UnionCompute } from '@wagmi/core/internal'
import { Actions } from '@wagmi/core/tempo'
import { useEffect } from 'react'

import { useChainId } from '../../hooks/useChainId.js'
import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter } from '../../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../../utils/query.js'
import type { QueryParameter } from '../utils.js'

/**
 * Hook for getting the nonce for an account and nonce key.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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
  selectData = Actions.nonce.getNonce.ReturnValue,
>(
  parameters: useNonce.Parameters<config, selectData> = {},
): useNonce.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.nonce.getNonce.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useNonce {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.nonce.getNonce.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.nonce.getNonce.ReturnValue,
      Actions.nonce.getNonce.ErrorType,
      selectData,
      Actions.nonce.getNonce.QueryKey<config>
    > &
    ExactPartial<Actions.nonce.getNonce.Parameters<config>>

  export type ReturnValue<selectData = Actions.nonce.getNonce.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for watching nonce incremented events.
 *
 * @deprecated This function has been deprecated post-AllegroModerato. It will be removed in a future version.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: rest.x is explicitly listed
  useEffect(() => {
    if (!enabled) return
    if (!onNonceIncremented) return
    return Actions.nonce.watchNonceIncremented(config, {
      ...rest,
      chainId,
      onNonceIncremented,
    })
  }, [
    config,
    enabled,
    chainId,
    onNonceIncremented,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
  ])
}

export declare namespace useWatchNonceIncremented {
  type Parameters<config extends Config = Config> = UnionCompute<
    ExactPartial<Actions.nonce.watchNonceIncremented.Parameters<config>> &
      ConfigParameter<config> & { enabled?: boolean | undefined }
  >
}
