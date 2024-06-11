import type { QueryOptions } from '@tanstack/query-core'

import {
  type EstimateGasErrorType,
  type EstimateGasParameters,
  type EstimateGasReturnType,
  estimateGas,
} from '../actions/estimateGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateGasOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = UnionPartial<EstimateGasParameters<config, chainId>> & ScopeKeyParameter

export function estimateGasQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: EstimateGasOptions<config, chainId> = {} as any) {
  return {
    async queryFn({ queryKey }) {
      const { connector } = options
      const { account, scopeKey: _, ...parameters } = queryKey[1]
      if (!account && !connector)
        throw new Error('account or connector is required')
      return estimateGas(config, { account, connector, ...(parameters as any) })
    },
    queryKey: estimateGasQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateGasQueryFnData,
    EstimateGasErrorType,
    EstimateGasData,
    EstimateGasQueryKey<config, chainId>
  >
}

export type EstimateGasQueryFnData = EstimateGasReturnType

export type EstimateGasData = EstimateGasQueryFnData

export function estimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(options: EstimateGasOptions<config, chainId> = {} as any) {
  const { connector: _, ...rest } = options
  return ['estimateGas', filterQueryOptions(rest)] as const
}

export type EstimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof estimateGasQueryKey<config, chainId>>
