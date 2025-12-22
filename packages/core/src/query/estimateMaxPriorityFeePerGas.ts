import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type EstimateMaxPriorityFeePerGasErrorType,
  type EstimateMaxPriorityFeePerGasParameters,
  type EstimateMaxPriorityFeePerGasReturnType,
  estimateMaxPriorityFeePerGas,
} from '../actions/estimateMaxPriorityFeePerGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateMaxPriorityFeePerGasOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<EstimateMaxPriorityFeePerGasParameters<config, chainId>> &
    ScopeKeyParameter
>

export function estimateMaxPriorityFeePerGasQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  options: EstimateMaxPriorityFeePerGasOptions<config, chainId> = {},
) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      const result = await estimateMaxPriorityFeePerGas(config, parameters)
      return result ?? null
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options),
  } as const satisfies QueryObserverOptions<
    EstimateMaxPriorityFeePerGasQueryFnData,
    EstimateMaxPriorityFeePerGasErrorType,
    EstimateMaxPriorityFeePerGasData,
    EstimateMaxPriorityFeePerGasQueryFnData,
    EstimateMaxPriorityFeePerGasQueryKey<config, chainId>
  >
}

export type EstimateMaxPriorityFeePerGasQueryFnData =
  t.Compute<EstimateMaxPriorityFeePerGasReturnType>

export type EstimateMaxPriorityFeePerGasData =
  EstimateMaxPriorityFeePerGasQueryFnData

export function estimateMaxPriorityFeePerGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: EstimateMaxPriorityFeePerGasOptions<config, chainId> = {}) {
  return ['estimateMaxPriorityFeePerGas', filterQueryOptions(options)] as const
}

export type EstimateMaxPriorityFeePerGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof estimateMaxPriorityFeePerGasQueryKey<config, chainId>>
