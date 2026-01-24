import {
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from '../actions/getStorageAt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStorageAtOptions<
  config extends Config,
  selectData = GetStorageAtData,
> = Compute<ExactPartial<GetStorageAtParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    selectData,
    GetStorageAtQueryKey<config>
  >

export function getStorageAtQueryOptions<
  config extends Config,
  selectData = GetStorageAtData,
>(
  config: config,
  options: GetStorageAtOptions<config, selectData> = {},
): GetStorageAtQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.address && options.slot && (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address || !parameters.slot)
        throw new Error('address and slot are required')
      return getStorageAt(config, {
        ...(parameters as GetStorageAtParameters),
        address: parameters.address,
        slot: parameters.slot,
      })
    },
    queryKey: getStorageAtQueryKey(options),
  }
}

export type GetStorageAtQueryFnData = GetStorageAtReturnType

export type GetStorageAtData = GetStorageAtQueryFnData

export function getStorageAtQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetStorageAtParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['getStorageAt', filterQueryOptions(options)] as const
}

export type GetStorageAtQueryKey<config extends Config> = ReturnType<
  typeof getStorageAtQueryKey<config>
>

export type GetStorageAtQueryOptions<
  config extends Config,
  selectData = GetStorageAtData,
> = QueryOptions<
  GetStorageAtQueryFnData,
  GetStorageAtErrorType,
  selectData,
  GetStorageAtQueryKey<config>
>
