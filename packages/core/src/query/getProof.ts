import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetProofErrorType,
  type GetProofParameters,
  type GetProofReturnType,
  getProof,
} from '../actions/getProof.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetProofOptions<config extends Config> = Evaluate<
  ExactPartial<GetProofParameters<config>> & ScopeKeyParameter
>

export function getProofQueryOptions<config extends Config>(
  config: config,
  options: GetProofOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, storageKeys, ...parameters } = queryKey[1]
      if (!address || !storageKeys)
        throw new Error('address and storageKeys are required')
      return getProof(config, { ...parameters, address, storageKeys })
    },
    queryKey: getProofQueryKey(options),
  } as const satisfies QueryOptions<
    GetProofQueryFnData,
    GetProofErrorType,
    GetProofData,
    GetProofQueryKey<config>
  >
}

export type GetProofQueryFnData = GetProofReturnType

export type GetProofData = GetProofQueryFnData

export function getProofQueryKey<config extends Config>(
  options: GetProofOptions<config>,
) {
  return ['getProof', filterQueryOptions(options)] as const
}

export type GetProofQueryKey<config extends Config> = ReturnType<
  typeof getProofQueryKey<config>
>
