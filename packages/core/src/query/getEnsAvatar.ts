import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsAvatarErrorType,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from '../actions/getEnsAvatar.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsAvatarOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsAvatarParameters<config>> & ScopeKeyParameter
>

export function getEnsAvatarQueryOptions<config extends Config>(
  config: config,
  options: GetEnsAvatarOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1]
      if (!name) throw new Error('name is required')
      return getEnsAvatar(config, { ...parameters, name })
    },
    queryKey: getEnsAvatarQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsAvatarQueryFnData,
    GetEnsAvatarErrorType,
    GetEnsAvatarData,
    GetEnsAvatarQueryKey<config>
  >
}

export type GetEnsAvatarQueryFnData = GetEnsAvatarReturnType

export type GetEnsAvatarData = GetEnsAvatarQueryFnData

export function getEnsAvatarQueryKey<config extends Config>(
  options: GetEnsAvatarOptions<config> = {},
) {
  return ['ensAvatar', filterQueryOptions(options)] as const
}

export type GetEnsAvatarQueryKey<config extends Config> = ReturnType<
  typeof getEnsAvatarQueryKey<config>
>
