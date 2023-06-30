import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTokenError,
  type GetTokenParameters,
  type GetTokenReturnType,
  getToken,
} from '../actions/getToken.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type GetTokenOptions<config extends Config> = Evaluate<
  ExactPartial<GetTokenParameters<config>>
>

export function getTokenQueryOptions<config extends Config>(
  config: Config,
  options: GetTokenOptions<config> = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { address, ...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')
      return getToken(config, { ...parameters, address })
    },
    queryKey: getTokenQueryKey(options),
  } as const satisfies QueryOptions<
    GetTokenQueryFnData,
    GetTokenError,
    GetTokenData,
    GetTokenQueryKey<config>
  >
}

export type GetTokenQueryFnData = GetTokenReturnType

export type GetTokenData = GetTokenQueryFnData

export function getTokenQueryKey<config extends Config>(
  options: GetTokenOptions<config> = {},
) {
  return ['token', options] as const
}

export type GetTokenQueryKey<config extends Config> = ReturnType<
  typeof getTokenQueryKey<config>
>
