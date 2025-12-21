import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetEnsAddressErrorType,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsAddressOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetEnsAddressParameters<config>> & ScopeKeyParameter
>

export function getEnsAddressQueryOptions<config extends Config = Config>(
  config: config,
  options: GetEnsAddressOptions<config> = {},
) {
  return {
    enabled: Boolean(options.name),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.name) throw new Error('name is required')
      const result = await getEnsAddress(config, {
        ...parameters,
        name: parameters.name,
      })
      return result ?? null
    },
    queryKey: getEnsAddressQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetEnsAddressQueryFnData,
    GetEnsAddressErrorType,
    GetEnsAddressData,
    GetEnsAddressQueryFnData,
    GetEnsAddressQueryKey<config>
  >
}

export type GetEnsAddressQueryFnData = t.Compute<GetEnsAddressReturnType>

export type GetEnsAddressData = GetEnsAddressQueryFnData

export function getEnsAddressQueryKey<config extends Config = Config>(
  options: GetEnsAddressOptions<config> = {},
) {
  return ['getEnsAddress', filterQueryOptions(options)] as const
}

export type GetEnsAddressQueryKey<config extends Config> = ReturnType<
  typeof getEnsAddressQueryKey<config>
>
