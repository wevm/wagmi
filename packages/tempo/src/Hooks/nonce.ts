import type { DefaultError } from '@tanstack/query-core'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ExactPartial } from '@wagmi/core/internal'
import { useChainId, useConfig } from 'wagmi'
import type { ConfigParameter, QueryParameter } from 'wagmi/internal'
import { type UseQueryReturnType, useQuery } from 'wagmi/query'
import { getNonce } from '../Actions/nonce.js'

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
  const { account, nonceKey, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getNonce.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    query: undefined,
  })
  const enabled = Boolean(
    account && nonceKey !== undefined && (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
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
