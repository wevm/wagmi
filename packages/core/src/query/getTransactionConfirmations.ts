import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType,
  getTransactionConfirmations,
} from '../actions/getTransactionConfirmations.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionConfirmationsOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<
  ExactPartial<GetTransactionConfirmationsParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getTransactionConfirmationsQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  options: GetTransactionConfirmationsOptions<config, chainId> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const {
        hash,
        transactionReceipt,
        scopeKey: _,
        ...parameters
      } = queryKey[1]
      if (!hash && !transactionReceipt)
        throw new Error('hash or transactionReceipt is required')

      const confirmations = await getTransactionConfirmations(config, {
        ...(parameters as any),
        hash,
        transactionReceipt,
      })
      return confirmations ?? null
    },
    queryKey: getTransactionConfirmationsQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionConfirmationsQueryFnData,
    GetTransactionConfirmationsErrorType,
    GetTransactionConfirmationsData,
    GetTransactionConfirmationsQueryKey<config, chainId>
  >
}

export type GetTransactionConfirmationsQueryFnData =
  GetTransactionConfirmationsReturnType

export type GetTransactionConfirmationsData =
  GetTransactionConfirmationsQueryFnData

export function getTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetTransactionConfirmationsOptions<config, chainId> = {}) {
  return ['transactionConfirmations', filterQueryOptions(options)] as const
}

export type GetTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getTransactionConfirmationsQueryKey<config, chainId>>
