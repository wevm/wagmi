import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetBalanceError,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'
import type { Config } from '../config.js'
import type { Evaluate, PartialBy } from '../types/utils.js'
import type { ScopeKey } from './types.js'

export type GetBalanceOptions<config extends Config> = Evaluate<
  PartialBy<GetBalanceParameters<config>, 'address'> & ScopeKey
>

export function getBalanceQueryOptions<config extends Config>(
  config: config,
  options: GetBalanceOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { address, blockNumber, blockTag, ...rest } = queryKey[1]
      if (!address) throw new Error('address is required')
      const balance = await getBalance(
        config,
        blockNumber
          ? { ...rest, address, blockNumber }
          : { ...rest, address, blockTag },
      )
      return balance ?? null
    },
    queryKey: getBalanceQueryKey(options),
  } as const satisfies QueryOptions<
    GetBalanceQueryFnData,
    GetBalanceError,
    GetBalanceData,
    GetBalanceQueryKey<config>
  >
}

export type GetBalanceQueryFnData = NonNullable<GetBalanceReturnType> | null

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey<config extends Config>(
  options: GetBalanceOptions<config> = {},
) {
  return ['balance', options] as const
}

export type GetBalanceQueryKey<config extends Config> = ReturnType<
  typeof getBalanceQueryKey<config>
>
