import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type EstimateGasErrorType,
  type EstimateGasParameters,
  type EstimateGasReturnType,
  estimateGas,
} from '../actions/estimateGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateGasOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = UnionExactPartial<EstimateGasParameters<config, chainId>> &
  ScopeKeyParameter

export function estimateGasQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: EstimateGasOptions<config, chainId> = {} as any) {
  return {
    enabled: Boolean(options.account || options.connector),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.account && !options.connector)
        throw new Error('account or connector is required')
      return estimateGas(config, {
        ...(parameters as any),
        account: parameters.account,
        connector: options.connector,
      })
    },
    queryKey: estimateGasQueryKey(options),
  } as const satisfies QueryObserverOptions<
    EstimateGasQueryFnData,
    EstimateGasErrorType,
    EstimateGasData,
    EstimateGasQueryFnData,
    EstimateGasQueryKey<config, chainId>
  >
}

export type EstimateGasQueryFnData = EstimateGasReturnType

export type EstimateGasData = EstimateGasQueryFnData

export function estimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(options: EstimateGasOptions<config, chainId> = {} as any) {
  return ['estimateGas', filterQueryOptions(options)] as const
}

export type EstimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof estimateGasQueryKey<config, chainId>>
