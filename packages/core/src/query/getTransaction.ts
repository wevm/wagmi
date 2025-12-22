import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetTransactionErrorType,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
>

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetTransactionOptions<config, chainId> = {}) {
  return {
    enabled: Boolean(
      options.hash ||
        (options.index &&
          (options.blockHash || options.blockNumber || options.blockTag)),
    ),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (
        !(
          parameters.hash ||
          (parameters.index &&
            (parameters.blockHash ||
              parameters.blockNumber ||
              parameters.blockTag))
        )
      )
        throw new Error(
          'hash OR index AND blockHash, blockNumber, blockTag is required',
        )
      const result = await getTransaction(config, parameters as never)
      return (result ?? null) as unknown as GetTransactionData<config, chainId>
    },
    queryKey: getTransactionQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetTransactionQueryFnData<config, chainId>,
    GetTransactionErrorType,
    GetTransactionData<config, chainId>,
    GetTransactionQueryFnData<config, chainId>,
    GetTransactionQueryKey<config, chainId>
  >
}

export type GetTransactionQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<GetTransactionReturnType<config, chainId>>

export type GetTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionQueryFnData<config, chainId>

export function getTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetTransactionOptions<config, chainId> = {}) {
  return ['getTransaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>
