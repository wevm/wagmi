import {
  type EstimateGasErrorType,
  type EstimateGasParameters,
  type EstimateGasReturnType,
  estimateGas,
} from '../actions/estimateGas.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type EstimateGasOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = Compute<
  UnionExactPartial<EstimateGasParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    EstimateGasQueryFnData,
    EstimateGasErrorType,
    selectData,
    EstimateGasQueryKey<config, chainId>
  >

export function estimateGasQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
>(
  config: config,
  options: EstimateGasOptions<config, chainId, selectData> = {} as any,
): EstimateGasQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      (options.account || options.connector) &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.account && !options.connector)
        throw new Error('account or connector is required')
      return estimateGas(config, {
        ...(parameters as any),
        account: parameters.account,
        connector: options.connector,
      })
    },
    queryKey: estimateGasQueryKey(options),
  }
}

export type EstimateGasQueryFnData = EstimateGasReturnType

export type EstimateGasData = EstimateGasQueryFnData

export function estimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  options: Compute<
    UnionExactPartial<EstimateGasParameters<config, chainId>> &
      ScopeKeyParameter
  > = {} as any,
) {
  return ['estimateGas', filterQueryOptions(options)] as const
}

export type EstimateGasQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = ReturnType<typeof estimateGasQueryKey<config, chainId>>

export type EstimateGasQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = QueryOptions<
  EstimateGasQueryFnData,
  EstimateGasErrorType,
  selectData,
  EstimateGasQueryKey<config, chainId>
>
