import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType,
  getTransactionConfirmations,
} from '../actions/getTransactionConfirmations.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionConfirmationsOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = UnionPartial<GetTransactionConfirmationsParameters<config, chainId>> &
  ScopeKeyParameter

export function getTransactionConfirmationsQueryOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(
  config: config,
  options: GetTransactionConfirmationsOptions<config, chainId> = {} as any,
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
        hash,
        transactionReceipt,
        ...(parameters as any),
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
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(options: GetTransactionConfirmationsOptions<config, chainId> = {} as any) {
  return ['transactionConfirmations', filterQueryOptions(options)] as const
}

export type GetTransactionConfirmationsQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = ReturnType<typeof getTransactionConfirmationsQueryKey<config, chainId>>
