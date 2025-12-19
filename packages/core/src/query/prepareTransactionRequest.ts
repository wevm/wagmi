import type { QueryOptions } from '@tanstack/query-core'
import type { PrepareTransactionRequestRequest } from 'viem'
import {
  type PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType,
  prepareTransactionRequest,
} from '../actions/prepareTransactionRequest.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = UnionExactPartial<
  PrepareTransactionRequestParameters<config, chainId, request>
> &
  ScopeKeyParameter

export function prepareTransactionRequestQueryOptions<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
    request
  > = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      if (!parameters.to) throw new Error('to is required')
      const result = await prepareTransactionRequest(
        config,
        parameters as never,
      )
      return (result ?? null) as never
    },
    queryKey: prepareTransactionRequestQueryKey(options as never),
  } as const satisfies QueryOptions<
    PrepareTransactionRequestQueryFnData<config, chainId, request>,
    PrepareTransactionRequestErrorType,
    PrepareTransactionRequestData<config, chainId, request>,
    PrepareTransactionRequestQueryKey<config, chainId, request>
  >
}

export type PrepareTransactionRequestQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = t.Compute<PrepareTransactionRequestReturnType<config, chainId, request>>

export type PrepareTransactionRequestData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = PrepareTransactionRequestQueryFnData<config, chainId, request>

export function prepareTransactionRequestQueryKey<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
    request
  > = {} as never,
) {
  return ['prepareTransactionRequest', filterQueryOptions(options)] as const
}

export type PrepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = ReturnType<
  typeof prepareTransactionRequestQueryKey<config, chainId, request>
>
