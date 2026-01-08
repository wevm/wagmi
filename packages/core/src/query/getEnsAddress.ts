import {
  type GetEnsAddressErrorType,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsAddressOptions<
  config extends Config,
  selectData = GetEnsAddressData,
> = Compute<ExactPartial<GetEnsAddressParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetEnsAddressQueryFnData,
    GetEnsAddressErrorType,
    selectData,
    GetEnsAddressQueryKey<config>
  >

export function getEnsAddressQueryOptions<
  config extends Config,
  selectData = GetEnsAddressData,
>(
  config: config,
  options: GetEnsAddressOptions<config, selectData> = {},
): GetEnsAddressQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.name && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.name) throw new Error('name is required')
      return getEnsAddress(config, { ...parameters, name: parameters.name })
    },
    queryKey: getEnsAddressQueryKey(options),
  }
}

export type GetEnsAddressQueryFnData = GetEnsAddressReturnType

export type GetEnsAddressData = GetEnsAddressQueryFnData

export function getEnsAddressQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetEnsAddressParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['ensAddress', filterQueryOptions(options)] as const
}

export type GetEnsAddressQueryKey<config extends Config> = ReturnType<
  typeof getEnsAddressQueryKey<config>
>

export type GetEnsAddressQueryOptions<
  config extends Config,
  selectData = GetEnsAddressData,
> = QueryOptions<
  GetEnsAddressQueryFnData,
  GetEnsAddressErrorType,
  selectData,
  GetEnsAddressQueryKey<config>
>
