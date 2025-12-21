import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetBlockTransactionCountErrorType,
  type GetBlockTransactionCountParameters,
  type GetBlockTransactionCountReturnType,
  getBlockTransactionCount,
} from '../actions/getBlockTransactionCount.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockTransactionCountOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<GetBlockTransactionCountParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getBlockTransactionCountQueryOptions<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  options: GetBlockTransactionCountOptions<config, chainId> = {},
) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      const result = await getBlockTransactionCount(config, parameters)
      return result ?? null
    },
    queryKey: getBlockTransactionCountQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetBlockTransactionCountQueryFnData,
    GetBlockTransactionCountErrorType,
    GetBlockTransactionCountData,
    GetBlockTransactionCountQueryFnData,
    GetBlockTransactionCountQueryKey<config, chainId>
  >
}

export type GetBlockTransactionCountQueryFnData =
  t.Compute<GetBlockTransactionCountReturnType>

export type GetBlockTransactionCountData = GetBlockTransactionCountQueryFnData

export function getBlockTransactionCountQueryKey<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(options: GetBlockTransactionCountOptions<config, chainId> = {}) {
  return ['getBlockTransactionCount', filterQueryOptions(options)] as const
}

export type GetBlockTransactionCountQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockTransactionCountQueryKey<config, chainId>>
