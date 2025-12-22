import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetFeeHistoryErrorType,
  type GetFeeHistoryParameters,
  type GetFeeHistoryReturnType,
  getFeeHistory,
} from '../actions/getFeeHistory.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetFeeHistoryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<GetFeeHistoryParameters<config, chainId>> & ScopeKeyParameter
>

export function getFeeHistoryQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetFeeHistoryOptions<config, chainId> = {}) {
  return {
    enabled: Boolean(options.blockCount && options.rewardPercentiles),
    queryFn: async (context) => {
      const { scopeKey: _, ...parameters } = context.queryKey[1]
      if (!parameters.blockCount) throw new Error('blockCount is required')
      if (!parameters.rewardPercentiles)
        throw new Error('rewardPercentiles is required')
      const result = await getFeeHistory(config, {
        ...parameters,
        blockCount: parameters.blockCount,
        rewardPercentiles: parameters.rewardPercentiles,
      })
      return result ?? null
    },
    queryKey: getFeeHistoryQueryKey(options),
  } as const satisfies QueryObserverOptions<
    GetFeeHistoryQueryFnData,
    GetFeeHistoryErrorType,
    GetFeeHistoryData,
    GetFeeHistoryQueryFnData,
    GetFeeHistoryQueryKey<config, chainId>
  >
}

export type GetFeeHistoryQueryFnData = t.Compute<GetFeeHistoryReturnType>

export type GetFeeHistoryData = GetFeeHistoryQueryFnData

export function getFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetFeeHistoryOptions<config, chainId> = {}) {
  return ['getFeeHistory', filterQueryOptions(options)] as const
}

export type GetFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getFeeHistoryQueryKey<config, chainId>>
