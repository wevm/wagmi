import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetCapabilitiesErrorType,
  type GetCapabilitiesParameters,
  type GetCapabilitiesReturnType,
  getCapabilities,
} from '../actions/getCapabilities.js'
import type { Config } from '../createConfig.js'
import { ConnectorNotConnectedError } from '../errors/config.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'

export type GetCapabilitiesOptions<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = Compute<
  ExactPartial<GetCapabilitiesParameters<config, chainId>> & ScopeKeyParameter
>

export function getCapabilitiesQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(config: config, options: GetCapabilitiesOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const capabilities = await getCapabilities(config, parameters)
      return capabilities
    },
    queryKey: getCapabilitiesQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  } as const satisfies QueryOptions<
    GetCapabilitiesQueryFnData<config, chainId>,
    GetCapabilitiesErrorType,
    GetCapabilitiesData<config, chainId>,
    GetCapabilitiesQueryKey<config, chainId>
  >
}

export type GetCapabilitiesQueryFnData<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = GetCapabilitiesReturnType<config, chainId>

export type GetCapabilitiesData<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = GetCapabilitiesQueryFnData<config, chainId>

export function getCapabilitiesQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(options: GetCapabilitiesOptions<config, chainId> = {}) {
  return ['capabilities', filterQueryOptions(options)] as const
}

export type GetCapabilitiesQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = ReturnType<typeof getCapabilitiesQueryKey<config, chainId>>
