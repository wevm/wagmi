import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  getTransactionReceipt,
} from '../actions/getTransactionReceipt.js'
import type { GetTransactionReceiptReturnType } from '../actions/getTransactionReceipt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionReceiptOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetTransactionReceiptParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getTransactionReceiptQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetTransactionReceiptOptions<config, chainId> = {}) {
  return {
    queryFn({ queryKey }) {
      const { hash, scopeKey: _, ...parameters } = queryKey[1]
      if (!hash) throw new Error('hash is required')
      return getTransactionReceipt(config, { ...parameters, hash })
    },
    queryKey: getTransactionReceiptQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionReceiptQueryFnData<config, chainId>,
    GetTransactionReceiptErrorType,
    GetTransactionReceiptData<config, chainId>,
    GetTransactionReceiptQueryKey<config, chainId>
  >
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
>(options: GetTransactionReceiptOptions<config, chainId>) {
  return ['getTransactionReceipt', filterQueryOptions(options)] as const
}

export type GetTransactionReceiptQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionReceiptQueryKey<config, chainId>>
