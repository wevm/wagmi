import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetBytecodeErrorType,
  type GetBytecodeParameters,
  type GetBytecodeReturnType,
  getBytecode,
} from '../actions/getBytecode.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { type Evaluate, type ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBytecodeOptions<config extends Config> = Evaluate<
  ExactPartial<GetBytecodeParameters<config>> & ScopeKeyParameter
>

export function getBytecodeQueryOptions<config extends Config>(
  config: config,
  options: GetBytecodeOptions<config> = {},
) {
  return {
    queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      return getBytecode(config, { ...parameters, address })
    },
    queryKey: getBytecodeQueryKey(options),
  } as const satisfies QueryOptions<
    GetBytecodeQueryFnData,
    GetBytecodeErrorType,
    GetBytecodeData,
    GetBytecodeQueryKey
  >
}
export type GetBytecodeQueryFnData = GetBytecodeReturnType

export type GetBytecodeData = GetBytecodeQueryFnData

export function getBytecodeQueryKey<config extends Config>(
  options: GetBytecodeOptions<config>,
) {
  return ['getBytecode', filterQueryOptions(options)] as const
}

export type GetBytecodeQueryKey = ReturnType<typeof getBytecodeQueryKey>
