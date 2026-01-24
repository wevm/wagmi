import {
  type WaitForTransactionReceiptErrorType,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from '../actions/waitForTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type WaitForTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = Compute<
  ExactPartial<WaitForTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
> &
  QueryParameter<
    WaitForTransactionReceiptQueryFnData<config, chainId>,
    WaitForTransactionReceiptErrorType,
    selectData,
    WaitForTransactionReceiptQueryKey<config, chainId>
  >

export function waitForTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
  config: config,
  options: WaitForTransactionReceiptOptions<config, chainId, selectData> = {},
): WaitForTransactionReceiptQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.hash && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.hash) throw new Error('hash is required')
      return waitForTransactionReceipt(config, {
        ...parameters,
        onReplaced: options.onReplaced,
        hash: parameters.hash,
      }) as unknown as Promise<
        WaitForTransactionReceiptReturnType<config, chainId>
      >
    },
    queryKey: waitForTransactionReceiptQueryKey(options),
  }
}

export type WaitForTransactionReceiptQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WaitForTransactionReceiptReturnType<config, chainId>

export type WaitForTransactionReceiptData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WaitForTransactionReceiptQueryFnData<config, chainId>

export function waitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<WaitForTransactionReceiptParameters<config, chainId>> &
      ScopeKeyParameter
  > = {},
) {
  const { onReplaced: _, ...rest } = options
  return ['waitForTransactionReceipt', filterQueryOptions(rest)] as const
}

export type WaitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof waitForTransactionReceiptQueryKey<config, chainId>>

export type WaitForTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = QueryOptions<
  WaitForTransactionReceiptQueryFnData<config, chainId>,
  WaitForTransactionReceiptErrorType,
  selectData,
  WaitForTransactionReceiptQueryKey<config, chainId>
>
