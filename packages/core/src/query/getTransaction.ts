import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionError,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<ExactPartial<GetTransactionParameters<config, chainId>>>

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(config: Config, options: GetTransactionOptions<config, chainId> = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { blockHash, blockNumber, blockTag, hash, ...parameters } =
        queryKey[1]
      if (!(blockHash && blockNumber && blockTag && hash))
        throw new Error('blockHash, blockNumber, blockTag, or hash is required')

      let params
      if (blockHash) params = { ...parameters, blockHash }
      else if (blockNumber) params = { ...parameters, blockNumber }
      else if (blockTag) params = { ...parameters, blockTag }
      else if (hash) params = { ...parameters, hash }
      return getTransaction(
        config,
        params as GetTransactionParameters,
      ) as Promise<GetTransactionQueryFnData<config, chainId>>
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
  return ['ensName', options] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>
