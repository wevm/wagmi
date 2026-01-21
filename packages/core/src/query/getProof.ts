import {
  type GetProofErrorType,
  type GetProofParameters,
  type GetProofReturnType,
  getProof,
} from '../actions/getProof.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetProofOptions<
  config extends Config,
  selectData = GetProofData,
> = Compute<ExactPartial<GetProofParameters<config>> & ScopeKeyParameter> &
  QueryParameter<
    GetProofQueryFnData,
    GetProofErrorType,
    selectData,
    GetProofQueryKey<config>
  >

export function getProofQueryOptions<
  config extends Config,
  selectData = GetProofData,
>(
  config: config,
  options: GetProofOptions<config, selectData> = {},
): GetProofQueryOptions<config, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.address &&
        options.storageKeys &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.address || !parameters.storageKeys)
        throw new Error('address and storageKeys are required')
      return getProof(config, {
        ...(parameters as GetProofParameters),
        address: parameters.address,
        storageKeys: parameters.storageKeys,
      })
    },
    queryKey: getProofQueryKey(options),
  }
}

export type GetProofQueryFnData = GetProofReturnType

export type GetProofData = GetProofQueryFnData

export function getProofQueryKey<config extends Config>(
  options: Compute<
    ExactPartial<GetProofParameters<config>> & ScopeKeyParameter
  > = {},
) {
  return ['getProof', filterQueryOptions(options)] as const
}

export type GetProofQueryKey<config extends Config> = ReturnType<
  typeof getProofQueryKey<config>
>

export type GetProofQueryOptions<
  config extends Config,
  selectData = GetProofData,
> = QueryOptions<
  GetProofQueryFnData,
  GetProofErrorType,
  selectData,
  GetProofQueryKey<config>
>
