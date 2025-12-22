import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetEnsTextErrorType,
  type GetEnsTextParameters,
  type GetEnsTextReturnType,
  getEnsText,
} from '../actions/getEnsText.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsTextOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetEnsTextParameters<config>> & ScopeKeyParameter
>

export function getEnsTextQueryOptions<config extends Config>(
  config: config,
  options: GetEnsTextOptions<config> = {},
) {
  return {
    enabled: Boolean(options.name),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.name) throw new Error('name is required')
      const result = await getEnsText(config, {
        ...parameters,
        name: parameters.name,
      })
      return result ?? null
    },
    queryKey: getEnsTextQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetEnsTextQueryFnData,
    GetEnsTextErrorType,
    GetEnsTextData,
    GetEnsTextQueryFnData,
    GetEnsTextQueryKey<config>
  >
}

export type GetEnsTextQueryFnData = t.Compute<GetEnsTextReturnType>

export type GetEnsTextData = GetEnsTextQueryFnData

export function getEnsTextQueryKey<config extends Config>(
  options: GetEnsTextOptions<config> = {},
) {
  return ['getEnsText', filterQueryOptions(options)] as const
}

export type GetEnsTextQueryKey<config extends Config> = ReturnType<
  typeof getEnsTextQueryKey<config>
>
