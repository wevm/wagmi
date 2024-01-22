import { type QueryOptions } from '@tanstack/query-core'

import { type PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType } from 'viem'

import {
  type PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType,
  prepareTransactionRequest,
} from '../actions/prepareTransactionRequest.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { type UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<
  parameterType extends viem_PrepareTransactionRequestParameterType,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = UnionPartial<
  PrepareTransactionRequestParameters<parameterType, config, chainId>
> &
  ScopeKeyParameter

export function prepareTransactionRequestQueryOptions<
  config extends Config,
  parameterType extends viem_PrepareTransactionRequestParameterType,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    parameterType,
    config,
    chainId
  > = {} as any,
) {
  return {
    queryFn({ queryKey }) {
      const { scopeKey: _, to, ...parameters } = queryKey[1]
      if (!to) throw new Error('to is required')
      return prepareTransactionRequest(config, {
        to,
        ...(parameters as any),
      }) as unknown as Promise<
        PrepareTransactionRequestQueryFnData<parameterType, config, chainId>
      >
    },
    queryKey: prepareTransactionRequestQueryKey(options),
  } as const satisfies QueryOptions<
    PrepareTransactionRequestQueryFnData<parameterType, config, chainId>,
    PrepareTransactionRequestErrorType,
    PrepareTransactionRequestData<parameterType, config, chainId>,
    PrepareTransactionRequestQueryKey<parameterType, config, chainId>
  >
}
export type PrepareTransactionRequestQueryFnData<
  parameterType extends viem_PrepareTransactionRequestParameterType,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = PrepareTransactionRequestReturnType<parameterType, config, chainId>

export type PrepareTransactionRequestData<
  parameterType extends viem_PrepareTransactionRequestParameterType,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = PrepareTransactionRequestQueryFnData<parameterType, config, chainId>

export function prepareTransactionRequestQueryKey<
  config extends Config,
  parameterType extends viem_PrepareTransactionRequestParameterType,
  chainId extends config['chains'][number]['id'] | undefined,
>(options: PrepareTransactionRequestOptions<parameterType, config, chainId>) {
  const { connector: _c, ...rest } = options
  return ['prepareTransactionRequest', filterQueryOptions(rest)] as const
}

export type PrepareTransactionRequestQueryKey<
  parameterType extends viem_PrepareTransactionRequestParameterType,
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<
  typeof prepareTransactionRequestQueryKey<config, parameterType, chainId>
>
