import type { QueryOptions } from '@tanstack/query-core'
import {
  type GetBlobBaseFeeErrorType,
  type GetBlobBaseFeeParameters,
  type GetBlobBaseFeeReturnType,
  getBlobBaseFee,
} from '../actions/getBlobBaseFee.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlobBaseFeeOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetBlobBaseFeeParameters<config, chainId>> & ScopeKeyParameter
>

export function getBlobBaseFeeQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetBlobBaseFeeOptions<config, chainId> = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const blobBaseFee = await getBlobBaseFee(config, parameters)
      return blobBaseFee ?? null
    },
    queryKey: getBlobBaseFeeQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlobBaseFeeQueryFnData,
    GetBlobBaseFeeErrorType,
    GetBlobBaseFeeData,
    GetBlobBaseFeeQueryKey<config, chainId>
  >
}

export type GetBlobBaseFeeQueryFnData = GetBlobBaseFeeReturnType

export type GetBlobBaseFeeData = GetBlobBaseFeeQueryFnData

export function getBlobBaseFeeQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetBlobBaseFeeOptions<config, chainId> = {}) {
  return ['getBlobBaseFee', filterQueryOptions(options)] as const
}

export type GetBlobBaseFeeQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlobBaseFeeQueryKey<config, chainId>>
