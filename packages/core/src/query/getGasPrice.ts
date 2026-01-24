import {
  type GetGasPriceErrorType,
  type GetGasPriceParameters,
  type GetGasPriceReturnType,
  getGasPrice,
} from '../actions/getGasPrice.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetGasPriceOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetGasPriceData,
> = Compute<
  ExactPartial<GetGasPriceParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetGasPriceQueryFnData,
    GetGasPriceErrorType,
    selectData,
    GetGasPriceQueryKey<config, chainId>
  >

export function getGasPriceQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetGasPriceData,
>(
  config: config,
  options: GetGasPriceOptions<config, chainId, selectData> = {},
): GetGasPriceQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const gasPrice = await getGasPrice(config, parameters)
      return gasPrice ?? null
    },
    queryKey: getGasPriceQueryKey(options),
  }
}

export type GetGasPriceQueryFnData = GetGasPriceReturnType

export type GetGasPriceData = GetGasPriceQueryFnData

export function getGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetGasPriceParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['gasPrice', filterQueryOptions(options)] as const
}

export type GetGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getGasPriceQueryKey<config, chainId>>

export type GetGasPriceQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetGasPriceData,
> = QueryOptions<
  GetGasPriceQueryFnData,
  GetGasPriceErrorType,
  selectData,
  GetGasPriceQueryKey<config, chainId>
>
