import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetGasPriceErrorType,
  type GetGasPriceParameters,
  type GetGasPriceReturnType,
  getGasPrice,
} from '../actions/getGasPrice.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetGasPriceOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<
  ExactPartial<GetGasPriceParameters<config, chainId>> & ScopeKeyParameter
>

export function getGasPriceQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetGasPriceOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const gasPrice = await getGasPrice(config, parameters)
      return gasPrice ?? null
    },
    queryKey: getGasPriceQueryKey(options),
  } as const satisfies QueryOptions<
    GetGasPriceQueryFnData,
    GetGasPriceErrorType,
    GetGasPriceData,
    GetGasPriceQueryKey<config, chainId>
  >
}

export type GetGasPriceQueryFnData = GetGasPriceReturnType

export type GetGasPriceData = GetGasPriceQueryFnData

export function getGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetGasPriceOptions<config, chainId> = {}) {
  return ['gasPrice', filterQueryOptions(options)] as const
}

export type GetGasPriceQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getGasPriceQueryKey<config, chainId>>
