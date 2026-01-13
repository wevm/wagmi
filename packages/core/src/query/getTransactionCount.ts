import {
  type GetTransactionCountErrorType,
  type GetTransactionCountParameters,
  type GetTransactionCountReturnType,
  getTransactionCount,
} from '../actions/getTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionCountOptions<
  config extends Config,
  selectData = GetTransactionCountData,
> = Compute<
  ExactPartial<GetTransactionCountParameters<config>> & ScopeKeyParameter
> &
  QueryParameter<
    GetTransactionCountQueryFnData,
    GetTransactionCountErrorType,
    selectData,
    GetTransactionCountQueryKey<config>
  >

export function getTransactionCountQueryOptions<
  config extends Config,
  selectData = GetTransactionCountData,
>(
  config: config,
  options: GetTransactionCountOptions<config, selectData> = {},
): GetTransactionCountQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.address && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      const transactionCount = await getTransactionCount(config, {
        ...(parameters as any),
        address: parameters.address,
      })
      return transactionCount ?? null
    },
    queryKey: getTransactionCountQueryKey(options),
  }
}

export type GetTransactionCountQueryFnData =
  Compute<GetTransactionCountReturnType>

export type GetTransactionCountData = GetTransactionCountQueryFnData

export function getTransactionCountQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetTransactionCountParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['transactionCount', filterQueryOptions(options)] as const
}

export type GetTransactionCountQueryKey<config extends Config> = ReturnType<
  typeof getTransactionCountQueryKey<config>
>

export type GetTransactionCountQueryOptions<
  config extends Config,
  selectData = GetTransactionCountData,
> = QueryOptions<
  GetTransactionCountQueryFnData,
  GetTransactionCountErrorType,
  selectData,
  GetTransactionCountQueryKey<config>
>
