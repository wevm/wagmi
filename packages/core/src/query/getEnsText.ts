import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsTextErrorType,
  type GetEnsTextParameters,
  type GetEnsTextReturnType,
  getEnsText,
} from '../actions/getEnsText.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsTextOptions<config extends Config> = Compute<
  ExactPartial<GetEnsTextParameters<config>> & ScopeKeyParameter
>

export function getEnsTextQueryOptions<config extends Config>(
  config: config,
  options: GetEnsTextOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { key, name, scopeKey: _, ...parameters } = queryKey[1]
      if (!key || !name) throw new Error('key and name are required')
      return getEnsText(config, { ...parameters, key, name })
    },
    queryKey: getEnsTextQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsTextQueryFnData,
    GetEnsTextErrorType,
    GetEnsTextData,
    GetEnsTextQueryKey<config>
  >
}

export type GetEnsTextQueryFnData = GetEnsTextReturnType

export type GetEnsTextData = GetEnsTextQueryFnData

export function getEnsTextQueryKey<config extends Config>(
  options: GetEnsTextOptions<config> = {},
) {
  return ['ensText', filterQueryOptions(options)] as const
}

export type GetEnsTextQueryKey<config extends Config> = ReturnType<
  typeof getEnsTextQueryKey<config>
>
