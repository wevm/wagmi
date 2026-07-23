import {
  type PrepareAuthorizationErrorType,
  type PrepareAuthorizationParameters,
  type PrepareAuthorizationReturnType,
  prepareAuthorization,
} from '../actions/prepareAuthorization.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareAuthorizationOptions<
  config extends Config,
  selectData = PrepareAuthorizationData,
> = Compute<
  ExactPartial<PrepareAuthorizationParameters<config>> & ScopeKeyParameter
> &
  QueryParameter<
    PrepareAuthorizationQueryFnData,
    PrepareAuthorizationErrorType,
    selectData,
    PrepareAuthorizationQueryKey<config>
  >

export function prepareAuthorizationQueryOptions<
  config extends Config,
  selectData = PrepareAuthorizationData,
>(
  config: config,
  options: PrepareAuthorizationOptions<config, selectData> = {},
): PrepareAuthorizationQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      (options.contractAddress || options.address) &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.contractAddress && !parameters.address)
        throw new Error('contractAddress or address is required')
      return prepareAuthorization(config, parameters)
    },
    queryKey: prepareAuthorizationQueryKey(options),
  }
}

export type PrepareAuthorizationQueryFnData = PrepareAuthorizationReturnType

export type PrepareAuthorizationData = PrepareAuthorizationQueryFnData

export function prepareAuthorizationQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<PrepareAuthorizationParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['prepareAuthorization', filterQueryOptions(options)] as const
}

export type PrepareAuthorizationQueryKey<config extends Config> = ReturnType<
  typeof prepareAuthorizationQueryKey<config>
>

export type PrepareAuthorizationQueryOptions<
  config extends Config,
  selectData = PrepareAuthorizationData,
> = QueryOptions<
  PrepareAuthorizationQueryFnData,
  PrepareAuthorizationErrorType,
  selectData,
  PrepareAuthorizationQueryKey<config>
>
