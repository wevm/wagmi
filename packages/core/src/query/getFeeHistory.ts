import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetFeeHistoryErrorType,
  type GetFeeHistoryParameters,
  type GetFeeHistoryReturnType,
  getFeeHistory,
} from '../actions/getFeeHistory.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, PartialBy } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetFeeHistoryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Evaluate<
  PartialBy<
    GetFeeHistoryParameters<config, chainId>,
    'blockCount' | 'rewardPercentiles'
  > &
    ScopeKeyParameter
>

export function getFeeHistoryQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetFeeHistoryOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const {
        blockCount,
        rewardPercentiles,
        scopeKey: _,
        ...parameters
      } = queryKey[1]
      if (!blockCount) throw new Error('blockCount is required')
      if (!rewardPercentiles) throw new Error('rewardPercentiles is required')
      const feeHistory = await getFeeHistory(config, {
        ...(parameters as GetFeeHistoryParameters),
        blockCount,
        rewardPercentiles,
      })
      return feeHistory ?? null
    },
    queryKey: getFeeHistoryQueryKey(options),
  } as const satisfies QueryOptions<
    GetFeeHistoryQueryFnData,
    GetFeeHistoryErrorType,
    GetFeeHistoryData,
    GetFeeHistoryQueryKey<config, chainId>
  >
}

export type GetFeeHistoryQueryFnData = GetFeeHistoryReturnType

export type GetFeeHistoryData = GetFeeHistoryQueryFnData

export function getFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetFeeHistoryOptions<config, chainId> = {}) {
  return ['feeHistory', filterQueryOptions(options)] as const
}

export type GetFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getFeeHistoryQueryKey<config, chainId>>
