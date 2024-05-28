import type { QueryOptions } from '@tanstack/query-core'
import type { FeeValuesType } from 'viem'

import {
  type EstimateFeesPerGasErrorType,
  type EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType,
  estimateFeesPerGas,
} from '../actions/estimateFeesPerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeesPerGasOptions<
  type extends FeeValuesType,
  config extends Config,
> = Evaluate<
  ExactPartial<EstimateFeesPerGasParameters<type, config>> & ScopeKeyParameter
>

export function estimateFeesPerGasQueryOptions<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
>(config: config, options: EstimateFeesPerGasOptions<type, config> = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      return estimateFeesPerGas(config, parameters)
    },
    queryKey: estimateFeesPerGasQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateFeesPerGasQueryFnData<type>,
    EstimateFeesPerGasErrorType,
    EstimateFeesPerGasData<type>,
    EstimateFeesPerGasQueryKey<config, type>
  >
}

export type EstimateFeesPerGasQueryFnData<type extends FeeValuesType> =
  EstimateFeesPerGasReturnType<type>

export type EstimateFeesPerGasData<type extends FeeValuesType> =
  EstimateFeesPerGasQueryFnData<type>

export function estimateFeesPerGasQueryKey<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
>(options: EstimateFeesPerGasOptions<type, config> = {}) {
  return ['estimateFeesPerGas', filterQueryOptions(options)] as const
}

export type EstimateFeesPerGasQueryKey<
  config extends Config,
  type extends FeeValuesType,
> = ReturnType<typeof estimateFeesPerGasQueryKey<config, type>>
