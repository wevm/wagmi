import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType,
  getTransactionReceipt,
} from '../actions/getTransactionReceipt.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { type Evaluate, type ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionReceiptOptions<config extends Config> = Evaluate<
  ExactPartial<GetTransactionReceiptParameters<config>> & ScopeKeyParameter
>

export function getTransactionReceiptQueryOptions<config extends Config>(
  config: config,
  options: GetTransactionReceiptOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { hash, scopeKey: _, ...parameters } = queryKey[1]
      if (!hash) throw new Error('hash is required')
      return getTransactionReceipt(config, { ...parameters, hash })
    },
    queryKey: getTransactionReceiptQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionReceiptQueryFnData,
    GetTransactionReceiptErrorType,
    GetTransactionReceiptData,
    GetTransactionReceiptQueryKey
  >
}
export type GetTransactionReceiptQueryFnData = GetTransactionReceiptReturnType

export type GetTransactionReceiptData = GetTransactionReceiptQueryFnData

export function getTransactionReceiptQueryKey<config extends Config>(
  options: GetTransactionReceiptOptions<config>,
) {
  return ['getTransactionReceipt', filterQueryOptions(options)] as const
}

export type GetTransactionReceiptQueryKey = ReturnType<
  typeof getTransactionReceiptQueryKey
>
