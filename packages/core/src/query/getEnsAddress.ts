import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsAddressErrorType,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsAddressOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsAddressParameters<config>> & ScopeKeyParameter
>

export function getEnsAddressQueryOptions<config extends Config>(
  config: config,
  options: GetEnsAddressOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1]
      if (!name) throw new Error('name is required')
      return getEnsAddress(config, { ...parameters, name })
    },
    queryKey: getEnsAddressQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsAddressQueryFnData,
    GetEnsAddressErrorType,
    GetEnsAddressData,
    GetEnsAddressQueryKey<config>
  >
}

export type GetEnsAddressQueryFnData = GetEnsAddressReturnType

export type GetEnsAddressData = GetEnsAddressQueryFnData

export function getEnsAddressQueryKey<config extends Config>(
  options: GetEnsAddressOptions<config> = {},
) {
  return ['ensAddress', filterQueryOptions(options)] as const
}

export type GetEnsAddressQueryKey<config extends Config> = ReturnType<
  typeof getEnsAddressQueryKey<config>
>
