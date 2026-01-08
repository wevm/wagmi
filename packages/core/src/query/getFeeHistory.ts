import {
  type GetFeeHistoryErrorType,
  type GetFeeHistoryParameters,
  type GetFeeHistoryReturnType,
  getFeeHistory,
} from '../actions/getFeeHistory.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetFeeHistoryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetFeeHistoryData,
> = Compute<
  ExactPartial<GetFeeHistoryParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetFeeHistoryQueryFnData,
    GetFeeHistoryErrorType,
    selectData,
    GetFeeHistoryQueryKey<config, chainId>
  >

export function getFeeHistoryQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetFeeHistoryData,
>(
  config: config,
  options: GetFeeHistoryOptions<config, chainId, selectData> = {},
): GetFeeHistoryQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.blockCount &&
        options.rewardPercentiles &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.blockCount) throw new Error('blockCount is required')
      if (!parameters.rewardPercentiles)
        throw new Error('rewardPercentiles is required')
      const feeHistory = await getFeeHistory(config, {
        ...(parameters as GetFeeHistoryParameters),
        blockCount: parameters.blockCount,
        rewardPercentiles: parameters.rewardPercentiles,
      })
      return feeHistory ?? null
    },
    queryKey: getFeeHistoryQueryKey(options),
  }
}

export type GetFeeHistoryQueryFnData = GetFeeHistoryReturnType

export type GetFeeHistoryData = GetFeeHistoryQueryFnData

export function getFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetFeeHistoryParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['feeHistory', filterQueryOptions(options)] as const
}

export type GetFeeHistoryQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getFeeHistoryQueryKey<config, chainId>>

export type GetFeeHistoryQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetFeeHistoryData,
> = QueryOptions<
  GetFeeHistoryQueryFnData,
  GetFeeHistoryErrorType,
  selectData,
  GetFeeHistoryQueryKey<config, chainId>
>
