import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetConnectorClientError,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorClientOptions<config extends Config> = Evaluate<
  ExactPartial<GetConnectorClientParameters<config>> & ScopeKeyParameter
>

export function getConnectorClientQueryOptions<config extends Config>(
  config: config,
  options: GetConnectorClientOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { connector } = options
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1]
      return getConnectorClient(config, { ...parameters, connector })
    },
    queryKey: getConnectorClientQueryKey(options),
  } as const satisfies QueryOptions<
    GetConnectorClientQueryFnData,
    GetConnectorClientError,
    GetConnectorClientData,
    GetConnectorClientQueryKey<config>
  >
}

export type GetConnectorClientQueryFnData = GetConnectorClientReturnType

export type GetConnectorClientData = GetConnectorClientQueryFnData

export function getConnectorClientQueryKey<config extends Config>(
  options: GetConnectorClientOptions<config> = {},
) {
  const { connector, ...parameters } = options
  return [
    'connectorClient',
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid },
  ] as const
}

export type GetConnectorClientQueryKey<config extends Config> = ReturnType<
  typeof getConnectorClientQueryKey<config>
>
