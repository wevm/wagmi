import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBalanceOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetBalanceParameters<config>> & ScopeKeyParameter
>

export function getBalanceQueryOptions<config extends Config = Config>(
  config: config,
  options: GetBalanceOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      const result = await getBalance(config, {
        ...parameters,
        address: parameters.address,
      })
      return result ?? null
    },
    queryKey: getBalanceQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetBalanceQueryFnData,
    GetBalanceErrorType,
    GetBalanceData,
    GetBalanceQueryFnData,
    GetBalanceQueryKey<config>
  >
}

export type GetBalanceQueryFnData = t.Compute<GetBalanceReturnType>

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey<config extends Config = Config>(
  options: GetBalanceOptions<config> = {},
) {
  return ['getBalance', filterQueryOptions(options)] as const
}

export type GetBalanceQueryKey<config extends Config> = ReturnType<
  typeof getBalanceQueryKey<config>
>
