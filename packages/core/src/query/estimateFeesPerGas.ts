import { type QueryOptions } from '@tanstack/query-core'

import {
  type EstimateFeesPerGasError,
  type EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType,
  estimateFeesPerGas,
} from '../actions/estimateFeesPerGas.js'
import type { Config } from '../createConfig.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeesPerGasOptions<config extends Config> = Evaluate<
  ExactPartial<EstimateFeesPerGasParameters<config>> & ScopeKeyParameter
>

export function estimateFeesPerGasQueryOptions<config extends Config>(
  config: config,
  options: EstimateFeesPerGasOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      return estimateFeesPerGas(config, parameters)
    },
    queryKey: estimateFeesPerGasQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateFeesPerGasQueryFnData,
    EstimateFeesPerGasError,
    EstimateFeesPerGasData,
    EstimateFeesPerGasQueryKey<config>
  >
}

export type EstimateFeesPerGasQueryFnData = EstimateFeesPerGasReturnType

export type EstimateFeesPerGasData = EstimateFeesPerGasQueryFnData

export function estimateFeesPerGasQueryKey<config extends Config>(
  options: EstimateFeesPerGasOptions<config> = {},
) {
  return ['estimateFeesPerGas', filterQueryOptions(options)] as const
}

export type EstimateFeesPerGasQueryKey<config extends Config> = ReturnType<
  typeof estimateFeesPerGasQueryKey<config>
>
