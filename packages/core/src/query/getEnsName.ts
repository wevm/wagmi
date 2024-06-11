import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsNameErrorType,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetEnsNameOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsNameParameters<config>> & ScopeKeyParameter
>

export function getEnsNameQueryOptions<config extends Config>(
  config: config,
  options: GetEnsNameOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      return getEnsName(config, { ...parameters, address })
    },
    queryKey: getEnsNameQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsNameQueryFnData,
    GetEnsNameErrorType,
    GetEnsNameData,
    GetEnsNameQueryKey<config>
  >
}

export type GetEnsNameQueryFnData = GetEnsNameReturnType

export type GetEnsNameData = GetEnsNameQueryFnData

export function getEnsNameQueryKey<config extends Config>(
  options: GetEnsNameOptions<config> = {},
) {
  return ['ensName', filterQueryOptions(options)] as const
}

export type GetEnsNameQueryKey<config extends Config> = ReturnType<
  typeof getEnsNameQueryKey<config>
>
