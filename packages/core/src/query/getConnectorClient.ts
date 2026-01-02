import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetConnectorClientParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getConnectorClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetConnectorClientOptions<config, chainId> = {}) {
  return {
    enabled: Boolean(options.connector?.getProvider),
    gcTime: 0,
    queryFn: async (context) => {
      if (!options.connector?.getProvider)
        throw new Error('connector is required')
      const {
        connectorUid: _,
        scopeKey: _s,
        ...parameters
      } = context.queryKey[1]
      return getConnectorClient(config, {
        ...parameters,
        connector: options.connector,
      }) as unknown as Promise<GetConnectorClientReturnType<config, chainId>>
    },
    queryKey: getConnectorClientQueryKey(options),
    staleTime: Number.POSITIVE_INFINITY,
  } as const satisfies QueryObserverOptions<
    GetConnectorClientQueryFnData<config, chainId>,
    GetConnectorClientErrorType,
    GetConnectorClientData<config, chainId>,
    GetConnectorClientQueryFnData<config, chainId>,
    GetConnectorClientQueryKey<config, chainId>
  >
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
>(options: GetConnectorClientOptions<config, chainId> = {}) {
  return [
    'connectorClient',
    { ...filterQueryOptions(options), connectorUid: options.connector?.uid },
  ] as const
}

export type GetConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getConnectorClientQueryKey<config, chainId>>
