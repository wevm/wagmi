import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsNameError,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type GetEnsNameOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsNameParameters<config>>
>

export function getEnsNameQueryOptions<config extends Config>(
  config: Config,
  options: GetEnsNameOptions<config> = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { address, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      return getEnsName(config, { ...parameters, address })
    },
    queryKey: getEnsNameQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsNameQueryFnData,
    GetEnsNameError,
    GetEnsNameData,
    GetEnsNameQueryKey<config>
  >
}

export type GetEnsNameQueryFnData = GetEnsNameReturnType

export type GetEnsNameData = GetEnsNameQueryFnData

export function getEnsNameQueryKey<config extends Config>(
  options: GetEnsNameOptions<config> = {},
) {
  return ['ensName', options] as const
}

export type GetEnsNameQueryKey<config extends Config> = ReturnType<
  typeof getEnsNameQueryKey<config>
>
