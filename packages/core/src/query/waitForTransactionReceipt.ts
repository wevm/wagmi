import { type QueryOptions } from '@tanstack/query-core'

import {
  type WaitForTransactionReceiptError,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from '../actions/waitForTransactionReceipt.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type WaitForTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<ExactPartial<WaitForTransactionReceiptParameters<config, chainId>>>

export function waitForTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: Config,
  options: WaitForTransactionReceiptOptions<config, chainId> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { hash, ...parameters } = queryKey[1]
      if (!hash) throw new Error('hash is required')
      return waitForTransactionReceipt(config, {
        ...parameters,
        onReplaced: options.onReplaced,
        hash,
      })
    },
    queryKey: waitForTransactionReceiptQueryKey(options),
  } as const satisfies QueryOptions<
    WaitForTransactionReceiptQueryFnData<config, chainId>,
    WaitForTransactionReceiptError,
    WaitForTransactionReceiptData<config, chainId>,
    WaitForTransactionReceiptQueryKey<config, chainId>
  >
}

export type WaitForTransactionReceiptQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = WaitForTransactionReceiptReturnType<config, chainId>

export type WaitForTransactionReceiptData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = WaitForTransactionReceiptQueryFnData<config, chainId>

export function waitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(options: WaitForTransactionReceiptOptions<config, chainId> = {}) {
  const { onReplaced: _, ...rest } = options
  return ['waitForTransactionReceipt', rest] as const
}

export type WaitForTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof waitForTransactionReceiptQueryKey<config, chainId>>
