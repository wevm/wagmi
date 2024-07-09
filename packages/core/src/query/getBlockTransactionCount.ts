import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetBlockTransactionCountErrorType,
  type GetBlockTransactionCountParameters,
  type GetBlockTransactionCountReturnType,
  getBlockTransactionCount,
} from '../actions/getBlockTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { ExactPartial, UnionCompute } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockTransactionCountOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = UnionCompute<
  ExactPartial<GetBlockTransactionCountParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getBlockTransactionCountQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  options: GetBlockTransactionCountOptions<config, chainId> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const blockTransactionCount = await getBlockTransactionCount(
        config,
        parameters,
      )
      return blockTransactionCount ?? null
    },
    queryKey: getBlockTransactionCountQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlockTransactionCountQueryFnData,
    GetBlockTransactionCountErrorType,
    GetBlockTransactionCountData,
    GetBlockTransactionCountQueryKey<config, chainId>
  >
}

export type GetBlockTransactionCountQueryFnData =
  GetBlockTransactionCountReturnType

export type GetBlockTransactionCountData = GetBlockTransactionCountQueryFnData

export function getBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetBlockTransactionCountOptions<config, chainId> = {}) {
  return ['blockTransactionCount', filterQueryOptions(options)] as const
}

export type GetBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockTransactionCountQueryKey<config, chainId>>
