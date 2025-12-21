import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetProofErrorType,
  type GetProofParameters,
  type GetProofReturnType,
  getProof,
} from '../actions/getProof.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetProofOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetProofParameters<config>> & ScopeKeyParameter
>

export function getProofQueryOptions<config extends Config = Config>(
  config: config,
  options: GetProofOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address && options.storageKeys),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.storageKeys) throw new Error('storageKeys is required')
      const result = await getProof(config, {
        ...parameters,
        address: parameters.address,
        storageKeys: parameters.storageKeys,
      })
      return result ?? null
    },
    queryKey: getProofQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetProofQueryFnData,
    GetProofErrorType,
    GetProofData,
    GetProofQueryFnData,
    GetProofQueryKey<config>
  >
}

export type GetProofQueryFnData = t.Compute<GetProofReturnType>

export type GetProofData = GetProofQueryFnData

export function getProofQueryKey<config extends Config = Config>(
  options: GetProofOptions<config> = {},
) {
  return ['getProof', filterQueryOptions(options)] as const
}

export type GetProofQueryKey<config extends Config> = ReturnType<
  typeof getProofQueryKey<config>
>
