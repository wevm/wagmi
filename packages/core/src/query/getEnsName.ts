import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetEnsNameErrorType,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsNameOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetEnsNameParameters<config>> & ScopeKeyParameter
>

export function getEnsNameQueryOptions<config extends Config>(
  config: config,
  options: GetEnsNameOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      const result = await getEnsName(config, {
        ...parameters,
        address: parameters.address,
      })
      return result ?? null
    },
    queryKey: getEnsNameQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetEnsNameQueryFnData,
    GetEnsNameErrorType,
    GetEnsNameData,
    GetEnsNameQueryFnData,
    GetEnsNameQueryKey<config>
  >
}

export type GetEnsNameQueryFnData = t.Compute<GetEnsNameReturnType>

export type GetEnsNameData = GetEnsNameQueryFnData

export function getEnsNameQueryKey<config extends Config>(
  options: GetEnsNameOptions<config> = {},
) {
  return ['getEnsName', filterQueryOptions(options)] as const
}

export type GetEnsNameQueryKey<config extends Config> = ReturnType<
  typeof getEnsNameQueryKey<config>
>
