import {
  type GetBlockTransactionCountErrorType,
  type GetBlockTransactionCountParameters,
  type GetBlockTransactionCountReturnType,
  getBlockTransactionCount,
} from '../actions/getBlockTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { ExactPartial, UnionCompute } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockTransactionCountOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockTransactionCountData,
> = UnionCompute<
  ExactPartial<GetBlockTransactionCountParameters<config, chainId>> &
    ScopeKeyParameter
> &
  QueryParameter<
    GetBlockTransactionCountQueryFnData,
    GetBlockTransactionCountErrorType,
    selectData,
    GetBlockTransactionCountQueryKey<config, chainId>
  >

export function getBlockTransactionCountQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockTransactionCountData,
>(
  config: config,
  options: GetBlockTransactionCountOptions<config, chainId, selectData> = {},
): GetBlockTransactionCountQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const blockTransactionCount = await getBlockTransactionCount(
        config,
        parameters as any,
      )
      return blockTransactionCount ?? null
    },
    queryKey: getBlockTransactionCountQueryKey(options),
  }
}

export type GetBlockTransactionCountQueryFnData =
  GetBlockTransactionCountReturnType

export type GetBlockTransactionCountData = GetBlockTransactionCountQueryFnData

export function getBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: UnionCompute<
    ExactPartial<GetBlockTransactionCountParameters<config, chainId>> &
      ScopeKeyParameter
  > = {},
) {
  return ['blockTransactionCount', filterQueryOptions(options)] as const
}

export type GetBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockTransactionCountQueryKey<config, chainId>>

export type GetBlockTransactionCountQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockTransactionCountData,
> = QueryOptions<
  GetBlockTransactionCountQueryFnData,
  GetBlockTransactionCountErrorType,
  selectData,
  GetBlockTransactionCountQueryKey<config, chainId>
>
