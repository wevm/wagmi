import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Compute<
  ExactPartial<GetConnectorClientParameters<config, chainId>> &
    ScopeKeyParameter
> &
  Omit<
    QueryParameter<
      GetConnectorClientQueryFnData<config, chainId>,
      GetConnectorClientErrorType,
      selectData,
      GetConnectorClientQueryKey<config, chainId>
    >,
    'gcTime' | 'staleTime'
  >

export function getConnectorClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  config: config,
  options: GetConnectorClientOptions<config, chainId, selectData> = {},
): GetConnectorClientQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.connector?.getProvider && (options.query?.enabled ?? true),
    ),
    gcTime: 0,
    queryFn: async (context) => {
      const [, { connectorUid: _, scopeKey: __, ...parameters }] =
        context.queryKey
      return getConnectorClient(config, {
        ...parameters,
        connector: options.connector,
      }) as unknown as Promise<GetConnectorClientReturnType<config, chainId>>
    },
    queryKey: getConnectorClientQueryKey(options),
    staleTime: Number.POSITIVE_INFINITY,
  }
}

export type GetConnectorClientQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetConnectorClientReturnType<config, chainId>

export type GetConnectorClientData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetConnectorClientQueryFnData<config, chainId>

export function getConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetConnectorClientParameters<config, chainId>> &
      ScopeKeyParameter
  > = {},
) {
  return ['connectorClient', filterQueryOptions(options)] as const
}

export type GetConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getConnectorClientQueryKey<config, chainId>>

export type GetConnectorClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = QueryOptions<
  GetConnectorClientQueryFnData<config, chainId>,
  GetConnectorClientErrorType,
  selectData,
  GetConnectorClientQueryKey<config, chainId>
>
