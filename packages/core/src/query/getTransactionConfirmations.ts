import {
  type GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType,
  getTransactionConfirmations,
} from '../actions/getTransactionConfirmations.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionConfirmationsOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  selectData = GetTransactionConfirmationsData,
> = UnionExactPartial<GetTransactionConfirmationsParameters<config, chainId>> &
  ScopeKeyParameter &
  QueryParameter<
    GetTransactionConfirmationsQueryFnData,
    GetTransactionConfirmationsErrorType,
    selectData,
    GetTransactionConfirmationsQueryKey<config, chainId>
  >

export function getTransactionConfirmationsQueryOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  selectData = GetTransactionConfirmationsData,
>(
  config: config,
  options: GetTransactionConfirmationsOptions<
    config,
    chainId,
    selectData
  > = {} as any,
): GetTransactionConfirmationsQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      (options.hash || options.transactionReceipt) &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.hash && !parameters.transactionReceipt)
        throw new Error('hash or transactionReceipt is required')
      const confirmations = await getTransactionConfirmations(config, {
        ...(parameters as any),
        hash: parameters.hash,
        transactionReceipt: parameters.transactionReceipt,
      })
      return confirmations ?? null
    },
    queryKey: getTransactionConfirmationsQueryKey(options),
  }
}

export type GetTransactionConfirmationsQueryFnData =
  GetTransactionConfirmationsReturnType

export type GetTransactionConfirmationsData =
  GetTransactionConfirmationsQueryFnData

export function getTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(
  options: UnionExactPartial<
    GetTransactionConfirmationsParameters<config, chainId>
  > &
    ScopeKeyParameter = {} as any,
) {
  return ['transactionConfirmations', filterQueryOptions(options)] as const
}

export type GetTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = ReturnType<typeof getTransactionConfirmationsQueryKey<config, chainId>>

export type GetTransactionConfirmationsQueryOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  selectData = GetTransactionConfirmationsData,
> = QueryOptions<
  GetTransactionConfirmationsQueryFnData,
  GetTransactionConfirmationsErrorType,
  selectData,
  GetTransactionConfirmationsQueryKey<config, chainId>
>
