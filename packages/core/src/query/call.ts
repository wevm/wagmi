import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type CallErrorType,
  type CallParameters,
  type CallReturnType,
  call,
} from '../actions/call.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type CallOptions<config extends Config> = t.Compute<
  t.ExactPartial<CallParameters<config>> & ScopeKeyParameter
>

export function callQueryOptions<config extends Config = Config>(
  config: config,
  options: CallOptions<config> = {},
) {
  return {
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      const result = await call(config, parameters as never)
      return result ?? null
    },
    queryKey: callQueryKey(options),
  } as const satisfies QueryObserverOptions<
    CallQueryFnData,
    CallErrorType,
    CallData,
    CallQueryFnData,
    CallQueryKey<config>
  >
}

export type CallQueryFnData = t.Compute<CallReturnType>

export type CallData = CallQueryFnData

export function callQueryKey<config extends Config = Config>(
  options: CallOptions<config> = {},
) {
  return ['call', filterQueryOptions(options)] as const
}

export type CallQueryKey<config extends Config> = ReturnType<
  typeof callQueryKey<config>
>
