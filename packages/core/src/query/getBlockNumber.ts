import {
  type GetBlockNumberErrorType,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from '../actions/getBlockNumber.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockNumberOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Compute<
  ExactPartial<GetBlockNumberParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetBlockNumberQueryFnData,
    GetBlockNumberErrorType,
    selectData,
    GetBlockNumberQueryKey<config, chainId>
  >

export function getBlockNumberQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  config: config,
  options: GetBlockNumberOptions<config, chainId, selectData> = {},
): GetBlockNumberQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    gcTime: 0,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const blockNumber = await getBlockNumber(config, parameters)
      return blockNumber ?? null
    },
    queryKey: getBlockNumberQueryKey(options),
  }
}

export type GetBlockNumberQueryFnData = GetBlockNumberReturnType

export type GetBlockNumberData = GetBlockNumberQueryFnData

export function getBlockNumberQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetBlockNumberParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['blockNumber', filterQueryOptions(options)] as const
}

export type GetBlockNumberQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockNumberQueryKey<config, chainId>>

export type GetBlockNumberQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = QueryOptions<
  GetBlockNumberQueryFnData,
  GetBlockNumberErrorType,
  selectData,
  GetBlockNumberQueryKey<config, chainId>
>
