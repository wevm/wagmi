import {
  type GetCapabilitiesErrorType,
  type GetCapabilitiesParameters,
  type GetCapabilitiesReturnType,
  getCapabilities,
} from '../actions/getCapabilities.js'
import type { Config } from '../createConfig.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'

export type GetCapabilitiesOptions<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
> = Compute<
  ExactPartial<GetCapabilitiesParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetCapabilitiesQueryFnData<config, chainId>,
    GetCapabilitiesErrorType,
    selectData,
    GetCapabilitiesQueryKey<config, chainId>
  >

export function getCapabilitiesQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
>(
  config: config,
  options: GetCapabilitiesOptions<config, chainId, selectData> = {},
): GetCapabilitiesQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.connector?.getProvider && (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      if (!options.connector?.getProvider)
        throw new Error('connector is required')
      const [, { connectorUid: _, scopeKey: __, ...parameters }] =
        context.queryKey
      const capabilities = await getCapabilities(config, parameters)
      return capabilities
    },
    queryKey: getCapabilitiesQueryKey(options),
  }
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
>(
  options: Compute<
    ExactPartial<GetCapabilitiesParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['capabilities', filterQueryOptions(options)] as const
}

export type GetCapabilitiesQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = ReturnType<typeof getCapabilitiesQueryKey<config, chainId>>

export type GetCapabilitiesQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetCapabilitiesData<config, chainId>,
> = QueryOptions<
  GetCapabilitiesQueryFnData<config, chainId>,
  GetCapabilitiesErrorType,
  selectData,
  GetCapabilitiesQueryKey<config, chainId>
>
