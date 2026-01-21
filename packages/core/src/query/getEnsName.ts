import {
  type GetEnsNameErrorType,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsNameOptions<
  config extends Config,
  selectData = GetEnsNameData,
> = Compute<ExactPartial<GetEnsNameParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetEnsNameQueryFnData,
    GetEnsNameErrorType,
    selectData,
    GetEnsNameQueryKey<config>
  >

export function getEnsNameQueryOptions<
  config extends Config,
  selectData = GetEnsNameData,
>(
  config: config,
  options: GetEnsNameOptions<config, selectData> = {},
): GetEnsNameQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.address && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      return getEnsName(config, { ...parameters, address: parameters.address })
    },
    queryKey: getEnsNameQueryKey(options),
  }
}

export type GetEnsNameQueryFnData = GetEnsNameReturnType

export type GetEnsNameData = GetEnsNameQueryFnData

export function getEnsNameQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetEnsNameParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['ensName', filterQueryOptions(options)] as const
}

export type GetEnsNameQueryKey<config extends Config> = ReturnType<
  typeof getEnsNameQueryKey<config>
>

export type GetEnsNameQueryOptions<
  config extends Config,
  selectData = GetEnsNameData,
> = QueryOptions<
  GetEnsNameQueryFnData,
  GetEnsNameErrorType,
  selectData,
  GetEnsNameQueryKey<config>
>
