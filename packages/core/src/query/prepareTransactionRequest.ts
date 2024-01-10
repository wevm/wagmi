import { type QueryOptions } from '@tanstack/query-core'

import {
  type PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType,
  prepareTransactionRequest,
} from '../actions/prepareTransactionRequest.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<config extends Config> = Evaluate<
  ExactPartial<PrepareTransactionRequestParameters<config>> & ScopeKeyParameter
>

export function prepareTransactionRequestQueryOptions<config extends Config>(
  config: config,
  options: PrepareTransactionRequestOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const request = await prepareTransactionRequest(config, parameters)
      return request ?? null
    },
    queryKey: prepareTransactionRequestQueryKey(options),
  } as const satisfies QueryOptions<
    PrepareTransactionRequestQueryFnData,
    PrepareTransactionRequestErrorType,
    PrepareTransactionRequestData,
    PrepareTransactionRequestQueryKey
  >
}
export type PrepareTransactionRequestQueryFnData =
  PrepareTransactionRequestReturnType

export type PrepareTransactionRequestData = PrepareTransactionRequestQueryFnData

export function prepareTransactionRequestQueryKey<config extends Config>(
  options: PrepareTransactionRequestOptions<config>,
) {
  return ['prepareTransactionRequest', filterQueryOptions(options)] as const
}

export type PrepareTransactionRequestQueryKey = ReturnType<
  typeof prepareTransactionRequestQueryKey
>
