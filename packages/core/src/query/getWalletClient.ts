import {
  type GetWalletClientErrorType,
  type GetWalletClientParameters,
  type GetWalletClientReturnType,
  getWalletClient,
} from '../actions/getWalletClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetWalletClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = Compute<
  ExactPartial<GetWalletClientParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetWalletClientQueryFnData<config, chainId>,
    GetWalletClientErrorType,
    selectData,
    GetWalletClientQueryKey<config, chainId>
  >

export function getWalletClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
>(
  config: config,
  options: GetWalletClientOptions<config, chainId, selectData> = {},
): GetWalletClientQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.connector?.getProvider && (options.query?.enabled ?? true),
    ),
    gcTime: 0,
    queryFn: async (context) => {
      if (!options.connector?.getProvider)
        throw new Error('connector is required')
      const [, { connectorUid: _, scopeKey: __, ...parameters }] =
        context.queryKey
      return getWalletClient(config, {
        ...parameters,
        connector: options.connector,
      }) as never
    },
    queryKey: getWalletClientQueryKey(options),
    staleTime: Number.POSITIVE_INFINITY,
  }
}

export type GetWalletClientQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientReturnType<config, chainId>

export type GetWalletClientData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientQueryFnData<config, chainId>

export function getWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetWalletClientParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['walletClient', filterQueryOptions(options)] as const
}

export type GetWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getWalletClientQueryKey<config, chainId>>

export type GetWalletClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = QueryOptions<
  GetWalletClientQueryFnData<config, chainId>,
  GetWalletClientErrorType,
  selectData,
  GetWalletClientQueryKey<config, chainId>
>
