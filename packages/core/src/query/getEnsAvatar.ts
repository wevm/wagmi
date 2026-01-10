import {
  type GetEnsAvatarErrorType,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from '../actions/getEnsAvatar.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsAvatarOptions<
  config extends Config,
  selectData = GetEnsAvatarData,
> = Compute<ExactPartial<GetEnsAvatarParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetEnsAvatarQueryFnData,
    GetEnsAvatarErrorType,
    selectData,
    GetEnsAvatarQueryKey<config>
  >

export function getEnsAvatarQueryOptions<
  config extends Config,
  selectData = GetEnsAvatarData,
>(
  config: config,
  options: GetEnsAvatarOptions<config, selectData> = {},
): GetEnsAvatarQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.name && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.name) throw new Error('name is required')
      return getEnsAvatar(config, { ...parameters, name: parameters.name })
    },
    queryKey: getEnsAvatarQueryKey(options),
  }
}

export type GetEnsAvatarQueryFnData = GetEnsAvatarReturnType

export type GetEnsAvatarData = GetEnsAvatarQueryFnData

export function getEnsAvatarQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetEnsAvatarParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['ensAvatar', filterQueryOptions(options)] as const
}

export type GetEnsAvatarQueryKey<config extends Config> = ReturnType<
  typeof getEnsAvatarQueryKey<config>
>

export type GetEnsAvatarQueryOptions<
  config extends Config,
  selectData = GetEnsAvatarData,
> = QueryOptions<
  GetEnsAvatarQueryFnData,
  GetEnsAvatarErrorType,
  selectData,
  GetEnsAvatarQueryKey<config>
>
