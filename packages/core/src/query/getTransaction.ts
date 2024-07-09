import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionErrorType,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
>

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetTransactionOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const { blockHash, blockNumber, blockTag, hash, index } = queryKey[1]
      if (!blockHash && !blockNumber && !blockTag && !hash)
        throw new Error('blockHash, blockNumber, blockTag, or hash is required')
      if (!hash && !index)
        throw new Error(
          'index is required for blockHash, blockNumber, or blockTag',
        )
      const { scopeKey: _, ...rest } = queryKey[1]
      return getTransaction(
        config,
        rest as GetTransactionParameters,
      ) as unknown as Promise<GetTransactionQueryFnData<config, chainId>>
    },
    queryKey: getTransactionQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionQueryFnData<config, chainId>,
    GetTransactionErrorType,
    GetTransactionData<config, chainId>,
    GetTransactionQueryKey<config, chainId>
  >
}

export type GetTransactionQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReturnType<config, chainId>

export type GetTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionQueryFnData<config, chainId>

export function getTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetTransactionOptions<config, chainId> = {}) {
  return ['transaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>
