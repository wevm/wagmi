import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type EstimateMaxPriorityFeePerGasErrorType,
  type EstimateMaxPriorityFeePerGasParameters,
  type EstimateMaxPriorityFeePerGasReturnType,
  estimateMaxPriorityFeePerGas,
} from '../actions/estimateMaxPriorityFeePerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateMaxPriorityFeePerGasOptions<config extends Config> =
  Compute<
    ExactPartial<EstimateMaxPriorityFeePerGasParameters<config>> &
      ScopeKeyParameter
  >

export function estimateMaxPriorityFeePerGasQueryOptions<config extends Config>(
  config: config,
  options: EstimateMaxPriorityFeePerGasOptions<config> = {},
) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      return estimateMaxPriorityFeePerGas(config, parameters)
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options),
  } as const satisfies QueryObserverOptions<
    EstimateMaxPriorityFeePerGasQueryFnData,
    EstimateMaxPriorityFeePerGasErrorType,
    EstimateMaxPriorityFeePerGasQueryFnData,
    EstimateMaxPriorityFeePerGasData,
    EstimateMaxPriorityFeePerGasQueryKey<config>
  >
}

export type EstimateMaxPriorityFeePerGasQueryFnData =
  EstimateMaxPriorityFeePerGasReturnType

export type EstimateMaxPriorityFeePerGasData =
  EstimateMaxPriorityFeePerGasQueryFnData

export function estimateMaxPriorityFeePerGasQueryKey<config extends Config>(
  options: EstimateMaxPriorityFeePerGasOptions<config> = {},
) {
  return ['estimateMaxPriorityFeePerGas', filterQueryOptions(options)] as const
}

export type EstimateMaxPriorityFeePerGasQueryKey<config extends Config> =
  ReturnType<typeof estimateMaxPriorityFeePerGasQueryKey<config>>
