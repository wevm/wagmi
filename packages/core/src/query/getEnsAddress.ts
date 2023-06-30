import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetEnsAddressError,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type GetEnsAddressOptions<config extends Config> = Evaluate<
  ExactPartial<GetEnsAddressParameters<config>>
>

export function getEnsAddressQueryOptions<config extends Config>(
  config: Config,
  options: GetEnsAddressOptions<config> = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { name, ...parameters } = queryKey[1]
      if (!name) throw new Error('name is required')
      return getEnsAddress(config, { ...parameters, name })
    },
    queryKey: getEnsAddressQueryKey(options),
  } as const satisfies QueryOptions<
    GetEnsAddressQueryFnData,
    GetEnsAddressError,
    GetEnsAddressData,
    GetEnsAddressQueryKey<config>
  >
}

export type GetEnsAddressQueryFnData = GetEnsAddressReturnType

export type GetEnsAddressData = GetEnsAddressQueryFnData

export function getEnsAddressQueryKey<config extends Config>(
  options: GetEnsAddressOptions<config> = {},
) {
  return ['ensAddress', options] as const
}

export type GetEnsAddressQueryKey<config extends Config> = ReturnType<
  typeof getEnsAddressQueryKey<config>
>
