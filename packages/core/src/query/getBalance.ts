import {
  type GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBalanceOptions<
  config extends Config,
  selectData = GetBalanceData,
> = Compute<ExactPartial<GetBalanceParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetBalanceQueryFnData,
    GetBalanceErrorType,
    selectData,
    GetBalanceQueryKey<config>
  >

export function getBalanceQueryOptions<
  config extends Config,
  selectData = GetBalanceData,
>(
  config: config,
  options: GetBalanceOptions<config, selectData> = {},
): GetBalanceQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.address && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      const balance = await getBalance(config, {
        ...(parameters as GetBalanceParameters),
        address: parameters.address,
      })
      return balance ?? null
    },
    queryKey: getBalanceQueryKey(options),
  }
}

export type GetBalanceQueryFnData = Compute<GetBalanceReturnType>

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetBalanceParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['balance', filterQueryOptions(options)] as const
}

export type GetBalanceQueryKey<config extends Config> = ReturnType<
  typeof getBalanceQueryKey<config>
>

export type GetBalanceQueryOptions<
  config extends Config,
  selectData = GetBalanceData,
> = QueryOptions<
  GetBalanceQueryFnData,
  GetBalanceErrorType,
  selectData,
  GetBalanceQueryKey<config>
>
