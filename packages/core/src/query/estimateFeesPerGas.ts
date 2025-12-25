import type { QueryObserverOptions } from '@tanstack/query-core'
import type { FeeValuesType } from 'viem'
import {
  type EstimateFeesPerGasErrorType,
  type EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType,
  estimateFeesPerGas,
} from '../actions/estimateFeesPerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeesPerGasOptions<
  type extends FeeValuesType,
  config extends Config,
> = Compute<
  ExactPartial<EstimateFeesPerGasParameters<type, config>> & ScopeKeyParameter
>

export function estimateFeesPerGasQueryOptions<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
>(config: config, options: EstimateFeesPerGasOptions<type, config> = {}) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      const result = await estimateFeesPerGas(config, parameters)
      return result ?? null
    },
    queryKey: estimateFeesPerGasQueryKey(options),
  } as const satisfies QueryObserverOptions<
    EstimateFeesPerGasQueryFnData<type>,
    EstimateFeesPerGasErrorType,
    EstimateFeesPerGasData<type>,
    EstimateFeesPerGasQueryFnData<type>,
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
