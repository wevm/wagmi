import type { QueryOptions } from '@tanstack/query-core'

import type { PrepareTransactionRequestRequest as viem_PrepareTransactionRequestRequest } from 'viem'

import {
  type PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType,
  prepareTransactionRequest,
} from '../actions/prepareTransactionRequest.js'
import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = UnionPartial<
  PrepareTransactionRequestParameters<config, chainId, request>
> &
  ScopeKeyParameter

export function prepareTransactionRequestQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
    request
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
        PrepareTransactionRequestQueryFnData<config, chainId, request>
      >
    },
    queryKey: prepareTransactionRequestQueryKey(options),
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
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = PrepareTransactionRequestReturnType<config, chainId, request>

export type PrepareTransactionRequestData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = PrepareTransactionRequestQueryFnData<config, chainId, request>

export function prepareTransactionRequestQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(options: PrepareTransactionRequestOptions<config, chainId, request>) {
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
