import { type QueryOptions } from '@tanstack/query-core'

import { type PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType } from 'viem'

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

export type PrepareTransactionRequestOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
> = Evaluate<
  ExactPartial<
    PrepareTransactionRequestParameters<config, chainId, parameterType>
  > &
    ScopeKeyParameter
>

export function prepareTransactionRequestQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
    parameterType
  > = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, to, ...parameters } = queryKey[1]

      if (!to) throw new Error('to is required')

      return prepareTransactionRequest(config, {
        ...(parameters as PrepareTransactionRequestParameters<
          config,
          chainId,
          parameterType
        >),
        to,
      }) as unknown as Promise<
        PrepareTransactionRequestQueryFnData<config, chainId, parameterType>
      >
    },
    queryKey: prepareTransactionRequestQueryKey(options),
  } as const satisfies QueryOptions<
    PrepareTransactionRequestQueryFnData<config, chainId, parameterType>,
    PrepareTransactionRequestErrorType,
    PrepareTransactionRequestData<config, chainId, parameterType>,
    PrepareTransactionRequestQueryKey<config, chainId, parameterType>
  >
}
export type PrepareTransactionRequestQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
> = PrepareTransactionRequestReturnType<config, chainId, parameterType>

export type PrepareTransactionRequestData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
> = PrepareTransactionRequestQueryFnData<config, chainId, parameterType>

export function prepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
>(options: PrepareTransactionRequestOptions<config, chainId, parameterType>) {
  return ['prepareTransactionRequest', filterQueryOptions(options)] as const
}

export type PrepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
> = ReturnType<
  typeof prepareTransactionRequestQueryKey<config, chainId, parameterType>
>
