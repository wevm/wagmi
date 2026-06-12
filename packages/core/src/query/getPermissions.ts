import {
  type GetPermissionsErrorType,
  type GetPermissionsParameters,
  type GetPermissionsReturnType,
  getPermissions,
} from '../actions/getPermissions.js'
import type { Config } from '../createConfig.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'

export type GetPermissionsOptions<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetPermissionsData,
> = Compute<
  ExactPartial<GetPermissionsParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetPermissionsQueryFnData,
    GetPermissionsErrorType,
    selectData,
    GetPermissionsQueryKey<config, chainId>
  >

export function getPermissionsQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetPermissionsData,
>(
  config: config,
  options: GetPermissionsOptions<config, chainId, selectData> = {},
): GetPermissionsQueryOptions<config, chainId, selectData> {
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
      const permissions = await getPermissions(config, parameters)
      return permissions
    },
    queryKey: getPermissionsQueryKey(options),
  }
}

export type GetPermissionsQueryFnData = GetPermissionsReturnType

export type GetPermissionsData = GetPermissionsQueryFnData

export function getPermissionsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetPermissionsParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['permissions', filterQueryOptions(options)] as const
}

export type GetPermissionsQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getPermissionsQueryKey<config, chainId>>

export type GetPermissionsQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetPermissionsData,
> = QueryOptions<
  GetPermissionsQueryFnData,
  GetPermissionsErrorType,
  selectData,
  GetPermissionsQueryKey<config, chainId>
>
