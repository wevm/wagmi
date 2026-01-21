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
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { UnionExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type PrepareTransactionRequestOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
> = UnionExactPartial<
  PrepareTransactionRequestParameters<config, chainId, request>
> &
  ScopeKeyParameter &
  QueryParameter<
    PrepareTransactionRequestQueryFnData<config, chainId, request>,
    PrepareTransactionRequestErrorType,
    selectData,
    PrepareTransactionRequestQueryKey<config, chainId, request>
  >

export function prepareTransactionRequestQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
>(
  config: config,
  options: PrepareTransactionRequestOptions<
    config,
    chainId,
    request,
    selectData
  > = {} as any,
): PrepareTransactionRequestQueryOptions<config, chainId, request, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.to && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.to) throw new Error('to is required')
      return prepareTransactionRequest(config, {
        ...(parameters as any),
        to: parameters.to,
      }) as unknown as Promise<
        PrepareTransactionRequestQueryFnData<config, chainId, request>
      >
    },
    queryKey: prepareTransactionRequestQueryKey(
      options,
    ) as PrepareTransactionRequestQueryKey<config, chainId, request>,
  }
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
>(
  options: UnionExactPartial<
    PrepareTransactionRequestParameters<config, chainId, request>
  > &
    ScopeKeyParameter = {} as any,
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

export type PrepareTransactionRequestQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
> = QueryOptions<
  PrepareTransactionRequestQueryFnData<config, chainId, request>,
  PrepareTransactionRequestErrorType,
  selectData,
  PrepareTransactionRequestQueryKey<config, chainId, request>
>
