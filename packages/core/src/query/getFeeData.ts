import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetFeeDataError,
  type GetFeeDataParameters,
  type GetFeeDataReturnType,
  getFeeData,
} from '../actions/getFeeData.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type GetFeeDataOptions<config extends Config> = Evaluate<
  ExactPartial<GetFeeDataParameters<config>>
>

export function getFeeDataQueryOptions<config extends Config>(
  config: Config,
  options: GetFeeDataOptions<config> = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      return getFeeData(config, queryKey[1])
    },
    queryKey: getFeeDataQueryKey(options),
  } as const satisfies QueryOptions<
    GetFeeDataQueryFnData,
    GetFeeDataError,
    GetFeeDataData,
    GetFeeDataQueryKey<config>
  >
}

export type GetFeeDataQueryFnData = GetFeeDataReturnType

export type GetFeeDataData = GetFeeDataQueryFnData

export function getFeeDataQueryKey<config extends Config>(
  options: GetFeeDataOptions<config> = {},
) {
  return ['feeData', options] as const
}

export type GetFeeDataQueryKey<config extends Config> = ReturnType<
  typeof getFeeDataQueryKey<config>
>
