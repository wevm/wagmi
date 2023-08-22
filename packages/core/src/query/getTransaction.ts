import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionError,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
>

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(config: config, options: GetTransactionOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const {
        blockHash,
        blockNumber,
        blockTag,
        hash,
        index,
        scopeKey: _,
      } = queryKey[1]
      if (!blockHash && !blockNumber && !blockTag && !hash)
        throw new Error('blockHash, blockNumber, blockTag, or hash is required')
      if (!hash && !index)
        throw new Error(
          'index is required for blockHash, blockNumber, or blockTag',
        )
      return getTransaction(
        config,
        queryKey[1] as GetTransactionParameters,
      ) as unknown as Promise<GetTransactionQueryFnData<config, chainId>>
    },
    queryKey: getTransactionQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionQueryFnData<config, chainId>,
    GetTransactionError,
    GetTransactionData<config, chainId>,
    GetTransactionQueryKey<config, chainId>
  >
}

export type GetTransactionQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = GetTransactionReturnType<config, chainId>

export type GetTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = GetTransactionQueryFnData<config, chainId>

export function getTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(options: GetTransactionOptions<config, chainId> = {}) {
  return ['transaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>
