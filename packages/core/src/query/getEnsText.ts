import {
  type GetEnsTextErrorType,
  type GetEnsTextParameters,
  type GetEnsTextReturnType,
  getEnsText,
} from '../actions/getEnsText.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsTextOptions<
  config extends Config,
  selectData = GetEnsTextData,
> = Compute<ExactPartial<GetEnsTextParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetEnsTextQueryFnData,
    GetEnsTextErrorType,
    selectData,
    GetEnsTextQueryKey<config>
  >

export function getEnsTextQueryOptions<
  config extends Config,
  selectData = GetEnsTextData,
>(
  config: config,
  options: GetEnsTextOptions<config, selectData> = {},
): GetEnsTextQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.key && options.name && (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.key || !parameters.name)
        throw new Error('key and name are required')
      return getEnsText(config, {
        ...parameters,
        key: parameters.key,
        name: parameters.name,
      })
    },
    queryKey: getEnsTextQueryKey(options),
  }
}

export type GetEnsTextQueryFnData = GetEnsTextReturnType

export type GetEnsTextData = GetEnsTextQueryFnData

export function getEnsTextQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetEnsTextParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['ensText', filterQueryOptions(options)] as const
}

export type GetEnsTextQueryKey<config extends Config> = ReturnType<
  typeof getEnsTextQueryKey<config>
>

export type GetEnsTextQueryOptions<
  config extends Config,
  selectData = GetEnsTextData,
> = QueryOptions<
  GetEnsTextQueryFnData,
  GetEnsTextErrorType,
  selectData,
  GetEnsTextQueryKey<config>
>
