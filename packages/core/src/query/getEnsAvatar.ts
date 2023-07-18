import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsAvatarError,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from '../actions/getEnsAvatar.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'

export type GetEnsAvatarOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsAvatarParameters<config>> & ScopeKeyParameter
>

export function getEnsAvatarQueryOptions<config extends Config>(
  config: config,
  options: GetEnsAvatarOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { name, ...parameters } = queryKey[1]
      if (!name) throw new Error('name is required')
      return getEnsAvatar(config, { ...parameters, name })
    },
    queryKey: getEnsAvatarQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsAvatarQueryFnData,
    GetEnsAvatarError,
    GetEnsAvatarData,
    GetEnsAvatarQueryKey<config>
  >
}

export type GetEnsAvatarQueryFnData = GetEnsAvatarReturnType

export type GetEnsAvatarData = GetEnsAvatarQueryFnData

export function getEnsAvatarQueryKey<config extends Config>(
  options: GetEnsAvatarOptions<config> = {},
) {
  return ['ensAvatar', options] as const
}

export type GetEnsAvatarQueryKey<config extends Config> = ReturnType<
  typeof getEnsAvatarQueryKey<config>
>
