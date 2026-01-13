import {
  type EstimateMaxPriorityFeePerGasErrorType,
  type EstimateMaxPriorityFeePerGasParameters,
  type EstimateMaxPriorityFeePerGasReturnType,
  estimateMaxPriorityFeePerGas,
} from '../actions/estimateMaxPriorityFeePerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateMaxPriorityFeePerGasOptions<
  config extends Config,
  selectData = EstimateMaxPriorityFeePerGasData,
> = Compute<
  ExactPartial<EstimateMaxPriorityFeePerGasParameters<config>> &
    ScopeKeyParameter
> &
  QueryParameter<
    EstimateMaxPriorityFeePerGasQueryFnData,
    EstimateMaxPriorityFeePerGasErrorType,
    selectData,
    EstimateMaxPriorityFeePerGasQueryKey<config>
  >

export function estimateMaxPriorityFeePerGasQueryOptions<
  config extends Config,
  selectData = EstimateMaxPriorityFeePerGasData,
>(
  config: config,
  options: EstimateMaxPriorityFeePerGasOptions<config, selectData> = {},
): EstimateMaxPriorityFeePerGasQueryOptions<config, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      return estimateMaxPriorityFeePerGas(config, parameters)
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options),
  }
}

export type EstimateMaxPriorityFeePerGasQueryFnData =
  EstimateMaxPriorityFeePerGasReturnType

export type EstimateMaxPriorityFeePerGasData =
  EstimateMaxPriorityFeePerGasQueryFnData

export function estimateMaxPriorityFeePerGasQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<EstimateMaxPriorityFeePerGasParameters<config>> &
      ScopeKeyParameter
  > = {},
) {
  return ['estimateMaxPriorityFeePerGas', filterQueryOptions(options)] as const
}

export type EstimateMaxPriorityFeePerGasQueryKey<config extends Config> =
  ReturnType<typeof estimateMaxPriorityFeePerGasQueryKey<config>>

export type EstimateMaxPriorityFeePerGasQueryOptions<
  config extends Config,
  selectData = EstimateMaxPriorityFeePerGasData,
> = QueryOptions<
  EstimateMaxPriorityFeePerGasQueryFnData,
  EstimateMaxPriorityFeePerGasErrorType,
  selectData,
  EstimateMaxPriorityFeePerGasQueryKey<config>
>
