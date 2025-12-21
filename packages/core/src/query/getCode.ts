import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetCodeErrorType,
  type GetCodeParameters,
  type GetCodeReturnType,
  getCode,
} from '../actions/getCode.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetCodeOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetCodeParameters<config>> & ScopeKeyParameter
>

export function getCodeQueryOptions<config extends Config = Config>(
  config: config,
  options: GetCodeOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      const result = await getCode(config, parameters)
      return result ?? null
    },
    queryKey: getCodeQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetCodeQueryFnData,
    GetCodeErrorType,
    GetCodeData,
    GetCodeQueryFnData,
    GetCodeQueryKey<config>
  >
}

export type GetCodeQueryFnData = t.Compute<GetCodeReturnType>

export type GetCodeData = GetCodeQueryFnData

export function getCodeQueryKey<config extends Config = Config>(
  options: GetCodeOptions<config> = {},
) {
  return ['getCode', filterQueryOptions(options)] as const
}

export type GetCodeQueryKey<config extends Config> = ReturnType<
  typeof getCodeQueryKey<config>
>
