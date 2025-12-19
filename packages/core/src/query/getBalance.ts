import type { QueryOptions } from '@tanstack/query-core'
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
  t.PartialBy<GetBalanceParameters<config>, 'address'> & ScopeKeyParameter
>

export function getBalanceQueryOptions<config extends Config = Config>(
  config: config,
  options: GetBalanceOptions<config> = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      const result = await getBalance(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: getBalanceQueryKey(options as never),
  } as const satisfies QueryOptions<
    GetBalanceQueryFnData,
    GetBalanceErrorType,
    GetBalanceData,
    GetBalanceQueryKey<config>
  >
}

export type GetBalanceQueryFnData = t.Compute<GetBalanceReturnType>

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey<config extends Config = Config>(
  options: GetBalanceOptions<config> = {} as never,
) {
  return ['getBalance', filterQueryOptions(options)] as const
}

export type GetBalanceQueryKey<config extends Config> = ReturnType<
  typeof getBalanceQueryKey<config>
>
