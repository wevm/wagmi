import {
  type CallErrorType,
  type CallParameters,
  type CallReturnType,
  call,
} from '../actions/call.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type CallOptions<config extends Config, selectData = CallData> = Compute<
  ExactPartial<CallParameters<config>> & ScopeKeyParameter
> &
  QueryParameter<
    CallQueryFnData,
    CallErrorType,
    selectData,
    CallQueryKey<config>
  >

export function callQueryOptions<config extends Config, selectData = CallData>(
  config: config,
  options: CallOptions<config, selectData> = {},
): CallQueryOptions<config, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const data = await call(config, {
        ...parameters,
      } as CallParameters)
      return data ?? null
    },
    queryKey: callQueryKey(options),
  }
}

export type CallQueryFnData = CallReturnType

export type CallData = CallQueryFnData

export function callQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<CallParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['call', filterQueryOptions(options)] as const
}

export type CallQueryKey<config extends Config> = ReturnType<
  typeof callQueryKey<config>
>

export type CallQueryOptions<
  config extends Config,
  selectData = CallData,
> = QueryOptions<
  CallQueryFnData,
  CallErrorType,
  selectData,
  CallQueryKey<config>
>
