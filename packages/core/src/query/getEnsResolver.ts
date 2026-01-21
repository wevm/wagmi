import {
  type GetEnsResolverErrorType,
  type GetEnsResolverParameters,
  type GetEnsResolverReturnType,
  getEnsResolver,
} from '../actions/getEnsResolver.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsResolverOptions<
  config extends Config,
  selectData = GetEnsResolverData,
> = Compute<
  ExactPartial<GetEnsResolverParameters<config>> & ScopeKeyParameter
> &
  QueryParameter<
    GetEnsResolverQueryFnData,
    GetEnsResolverErrorType,
    selectData,
    GetEnsResolverQueryKey<config>
  >

export function getEnsResolverQueryOptions<
  config extends Config,
  selectData = GetEnsResolverData,
>(
  config: config,
  options: GetEnsResolverOptions<config, selectData> = {},
): GetEnsResolverQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.name && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.name) throw new Error('name is required')
      return getEnsResolver(config, { ...parameters, name: parameters.name })
    },
    queryKey: getEnsResolverQueryKey(options),
  }
}

export type GetEnsResolverQueryFnData = GetEnsResolverReturnType

export type GetEnsResolverData = GetEnsResolverQueryFnData

export function getEnsResolverQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetEnsResolverParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['ensResolver', filterQueryOptions(options)] as const
}

export type GetEnsResolverQueryKey<config extends Config> = ReturnType<
  typeof getEnsResolverQueryKey<config>
>

export type GetEnsResolverQueryOptions<
  config extends Config,
  selectData = GetEnsResolverData,
> = QueryOptions<
  GetEnsResolverQueryFnData,
  GetEnsResolverErrorType,
  selectData,
  GetEnsResolverQueryKey<config>
>
