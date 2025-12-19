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
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateFeesPerGasOptions<
  type extends FeeValuesType,
  config extends Config,
> = t.Compute<
  t.ExactPartial<EstimateFeesPerGasParameters<type, config>> & ScopeKeyParameter
>

export function estimateFeesPerGasQueryOptions<
  type extends FeeValuesType = 'eip1559',
  config extends Config = Config,
>(
  config: config,
  options: EstimateFeesPerGasOptions<type, config> = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const result = await estimateFeesPerGas(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: estimateFeesPerGasQueryKey(options as never),
  } as const satisfies QueryOptions<
    EstimateFeesPerGasQueryFnData<type>,
    EstimateFeesPerGasErrorType,
    EstimateFeesPerGasData<type>,
    EstimateFeesPerGasQueryKey<type, config>
  >
}

export type EstimateFeesPerGasQueryFnData<type extends FeeValuesType> =
  t.Compute<EstimateFeesPerGasReturnType<type>>

export type EstimateFeesPerGasData<type extends FeeValuesType> =
  EstimateFeesPerGasQueryFnData<type>

export function estimateFeesPerGasQueryKey<
  type extends FeeValuesType = 'eip1559',
  config extends Config = Config,
>(options: EstimateFeesPerGasOptions<type, config> = {} as never) {
  return ['estimateFeesPerGas', filterQueryOptions(options)] as const
}

export type EstimateFeesPerGasQueryKey<
  type extends FeeValuesType,
  config extends Config,
> = ReturnType<typeof estimateFeesPerGasQueryKey<type, config>>
