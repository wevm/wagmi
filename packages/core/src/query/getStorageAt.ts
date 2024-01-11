import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from '../actions/getStorageAt.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStorageAtOptions<config extends Config> = Evaluate<
  ExactPartial<GetStorageAtParameters<config>> & ScopeKeyParameter
>

export function getStorageAtQueryOptions<config extends Config>(
  config: config,
  options: GetStorageAtOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { address, slot, scopeKey: _, ...parameters } = queryKey[1]
      if (!address || !slot) throw new Error('address and slot are required')

      const data = await getStorageAt(config, {
        address,
        slot,
        ...parameters,
      })
      return (data ?? null) as GetStorageAtReturnType
    },
    queryKey: getStorageAtQueryKey(options),
  } as const satisfies QueryOptions<
    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    GetStorageAtData,
    GetStorageAtQueryKey
  >
}

export type GetStorageAtQueryFnData = GetStorageAtReturnType

export type GetStorageAtData = GetStorageAtQueryFnData

export function getStorageAtQueryKey<config extends Config>(
  options: GetStorageAtOptions<config>,
) {
  return ['getStorageAt', filterQueryOptions(options)] as const
}

export type GetStorageAtQueryKey = ReturnType<typeof getStorageAtQueryKey>
