import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from '../actions/getStorageAt.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetStorageAtOptions<config extends Config> = t.Compute<
  t.ExactPartial<GetStorageAtParameters<config>> & ScopeKeyParameter
>

export function getStorageAtQueryOptions<config extends Config = Config>(
  config: config,
  options: GetStorageAtOptions<config> = {},
) {
  return {
    enabled: Boolean(options.address && options.slot),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.address) throw new Error('address is required')
      if (!parameters.slot) throw new Error('slot is required')
      const result = await getStorageAt(config, {
        ...parameters,
        address: parameters.address,
        slot: parameters.slot,
      })
      return result ?? null
    },
    queryKey: getStorageAtQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    GetStorageAtData,
    GetStorageAtQueryFnData,
    GetStorageAtQueryKey<config>
  >
}

export type GetStorageAtQueryFnData = t.Compute<GetStorageAtReturnType>

export type GetStorageAtData = GetStorageAtQueryFnData

export function getStorageAtQueryKey<config extends Config = Config>(
  options: GetStorageAtOptions<config> = {},
) {
  return ['getStorageAt', filterQueryOptions(options)] as const
}

export type GetStorageAtQueryKey<config extends Config> = ReturnType<
  typeof getStorageAtQueryKey<config>
>
