import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type WaitForTransactionReceiptErrorType,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from '../actions/waitForTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type WaitForTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<WaitForTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
>

export function waitForTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  options: WaitForTransactionReceiptOptions<config, chainId> = {},
) {
  return {
    enabled: Boolean(options.hash),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.hash) throw new Error('hash is required')
      const result = await waitForTransactionReceipt(config, {
        ...parameters,
        hash: parameters.hash,
        onReplaced: options.onReplaced,
      })
      return result as WaitForTransactionReceiptData<config, chainId>
    },
    queryKey: waitForTransactionReceiptQueryKey(options),
  } as const satisfies QueryObserverOptions<
    WaitForTransactionReceiptQueryFnData<config, chainId>,
    WaitForTransactionReceiptErrorType,
    WaitForTransactionReceiptData<config, chainId>,
    WaitForTransactionReceiptQueryFnData<config, chainId>,
    WaitForTransactionReceiptQueryKey<config, chainId>
  >
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
>({
  onReplaced: _,
  ...options
}: WaitForTransactionReceiptOptions<config, chainId> = {}) {
  return ['waitForTransactionReceipt', filterQueryOptions(options)] as const
}

export type WaitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof waitForTransactionReceiptQueryKey<config, chainId>>
