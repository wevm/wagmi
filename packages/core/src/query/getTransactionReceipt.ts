import type { GetTransactionReceiptReturnType } from '../actions/getTransactionReceipt.js'
import {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  getTransactionReceipt,
} from '../actions/getTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = Compute<
  ExactPartial<GetTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
> &
  QueryParameter<
    GetTransactionReceiptQueryFnData<config, chainId>,
    GetTransactionReceiptErrorType,
    selectData,
    GetTransactionReceiptQueryKey<config, chainId>
  >

export function getTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
>(
  config: config,
  options: GetTransactionReceiptOptions<config, chainId, selectData> = {},
): GetTransactionReceiptQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.hash && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.hash) throw new Error('hash is required')
      return getTransactionReceipt(config, {
        ...(parameters as any),
        hash: parameters.hash,
      })
    },
    queryKey: getTransactionReceiptQueryKey(options),
  }
}

export type GetTransactionReceiptQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReceiptReturnType<config, chainId>

export type GetTransactionReceiptData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetTransactionReceiptQueryFnData<config, chainId>

export function getTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetTransactionReceiptParameters<config, chainId>> &
      ScopeKeyParameter
  > = {},
) {
  return ['getTransactionReceipt', filterQueryOptions(options)] as const
}

export type GetTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionReceiptQueryKey<config, chainId>>

export type GetTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = QueryOptions<
  GetTransactionReceiptQueryFnData<config, chainId>,
  GetTransactionReceiptErrorType,
  selectData,
  GetTransactionReceiptQueryKey<config, chainId>
>
