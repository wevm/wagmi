import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<
  ExactPartial<GetConnectorClientParameters<config, chainId>> &
    ScopeKeyParameter
>

export function getConnectorClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetConnectorClientOptions<config, chainId> = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1]
      return getConnectorClient(config, {
        ...parameters,
        connector,
      }) as unknown as Promise<GetConnectorClientReturnType<config, chainId>>
    },
    queryKey: getConnectorClientQueryKey(options),
  } as const satisfies QueryOptions<
    GetConnectorClientQueryFnData<config, chainId>,
    GetConnectorClientErrorType,
    GetConnectorClientData<config, chainId>,
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
  const { connector, ...parameters } = options
  return [
    'connectorClient',
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
  ] as const
}

export type GetConnectorClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getConnectorClientQueryKey<config, chainId>>
