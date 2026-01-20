import {
  type GetBlobBaseFeeErrorType,
  type GetBlobBaseFeeParameters,
  type GetBlobBaseFeeReturnType,
  getBlobBaseFee,
} from '../actions/getBlobBaseFee.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlobBaseFeeOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlobBaseFeeData,
> = Compute<
  ExactPartial<GetBlobBaseFeeParameters<config, chainId>> & ScopeKeyParameter
> &
  QueryParameter<
    GetBlobBaseFeeQueryFnData,
    GetBlobBaseFeeErrorType,
    selectData,
    GetBlobBaseFeeQueryKey<config, chainId>
  >

export function getBlobBaseFeeQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlobBaseFeeData,
>(
  config: config,
  options: GetBlobBaseFeeOptions<config, chainId, selectData> = {},
): GetBlobBaseFeeQueryOptions<config, chainId, selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const blobBaseFee = await getBlobBaseFee(config, parameters)
      return blobBaseFee ?? null
    },
    queryKey: getBlobBaseFeeQueryKey(options),
  }
}

export type GetBlobBaseFeeQueryFnData = GetBlobBaseFeeReturnType

export type GetBlobBaseFeeData = GetBlobBaseFeeQueryFnData

export function getBlobBaseFeeQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  options: Compute<
    ExactPartial<GetBlobBaseFeeParameters<config, chainId>> & ScopeKeyParameter
  > = {},
) {
  return ['blobBaseFee', filterQueryOptions(options)] as const
}

export type GetBlobBaseFeeQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlobBaseFeeQueryKey<config, chainId>>

export type GetBlobBaseFeeQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlobBaseFeeData,
> = QueryOptions<
  GetBlobBaseFeeQueryFnData,
  GetBlobBaseFeeErrorType,
  selectData,
  GetBlobBaseFeeQueryKey<config, chainId>
>
