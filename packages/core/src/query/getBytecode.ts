import {
  type GetBytecodeErrorType,
  type GetBytecodeParameters,
  type GetBytecodeReturnType,
  getBytecode,
} from '../actions/getBytecode.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBytecodeOptions<
  config extends Config,
  selectData = GetBytecodeData,
> = Compute<ExactPartial<GetBytecodeParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetBytecodeQueryFnData,
    GetBytecodeErrorType,
    selectData,
    GetBytecodeQueryKey<config>
  >

export function getBytecodeQueryOptions<
  config extends Config,
  selectData = GetBytecodeData,
>(
  config: config,
  options: GetBytecodeOptions<config, selectData> = {},
): GetBytecodeQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.address && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address) throw new Error('address is required')
      const bytecode = await getBytecode(config, {
        ...(parameters as any),
        address: parameters.address,
      })
      return (bytecode ?? null) as any
    },
    queryKey: getBytecodeQueryKey(options),
  }
}

export type GetBytecodeQueryFnData = GetBytecodeReturnType

export type GetBytecodeData = GetBytecodeQueryFnData

export function getBytecodeQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetBytecodeParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['getBytecode', filterQueryOptions(options)] as const
}

export type GetBytecodeQueryKey<config extends Config> = ReturnType<
  typeof getBytecodeQueryKey<config>
>

export type GetBytecodeQueryOptions<
  config extends Config,
  selectData = GetBytecodeData,
> = QueryOptions<
  GetBytecodeQueryFnData,
  GetBytecodeErrorType,
  selectData,
  GetBytecodeQueryKey<config>
>
