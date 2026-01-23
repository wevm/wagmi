import {
  type GetTransactionErrorType,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = Compute<
  ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetTransactionQueryFnData<config, chainId>,
    GetTransactionErrorType,
    selectData,
    GetTransactionQueryKey<config, chainId>
  >

export function getTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
>(
  config: config,
  options: GetTransactionOptions<config, chainId, selectData> = {},
): GetTransactionQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      (options.hash ||
        (options.index &&
          (options.blockHash || options.blockNumber || options.blockTag))) &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
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
      return getTransaction(
        config,
        parameters as GetTransactionParameters,
      ) as unknown as Promise<GetTransactionQueryFnData<config, chainId>>
    },
    queryKey: getTransactionQueryKey(options),
  }
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
>(
  options: Compute<
    ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['transaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionQueryKey<config, chainId>>

export type GetTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = QueryOptions<
  GetTransactionQueryFnData<config, chainId>,
  GetTransactionErrorType,
  selectData,
  GetTransactionQueryKey<config, chainId>
>
