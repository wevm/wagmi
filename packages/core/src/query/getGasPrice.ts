import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetGasPriceErrorType,
  type GetGasPriceParameters,
  type GetGasPriceReturnType,
  getGasPrice,
} from '../actions/getGasPrice.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetGasPriceOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<GetGasPriceParameters<config, chainId>> & ScopeKeyParameter
>

export function getGasPriceQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetGasPriceOptions<config, chainId> = {}) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      const result = await getGasPrice(config, parameters)
      return result ?? null
    },
    queryKey: getGasPriceQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetGasPriceQueryFnData,
    GetGasPriceErrorType,
    GetGasPriceData,
    GetGasPriceQueryFnData,
    GetGasPriceQueryKey<config, chainId>
  >
}

export type GetGasPriceQueryFnData = t.Compute<GetGasPriceReturnType>

export type GetGasPriceData = GetGasPriceQueryFnData

export function getGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetGasPriceOptions<config, chainId> = {}) {
  return ['getGasPrice', filterQueryOptions(options)] as const
}

export type GetGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getGasPriceQueryKey<config, chainId>>
