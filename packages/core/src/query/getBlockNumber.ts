import type { QueryOptions } from '@tanstack/query-core'
import {
  type GetBlockNumberErrorType,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from '../actions/getBlockNumber.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockNumberOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = t.Compute<
  t.ExactPartial<GetBlockNumberParameters<config, chainId>> & ScopeKeyParameter
>

export function getBlockNumberQueryOptions<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  options: GetBlockNumberOptions<config, chainId> = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const result = await getBlockNumber(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: getBlockNumberQueryKey(options as never),
  } as const satisfies QueryOptions<
    GetBlockNumberQueryFnData,
    GetBlockNumberErrorType,
    GetBlockNumberData,
    GetBlockNumberQueryKey<config, chainId>
  >
}

export type GetBlockNumberQueryFnData = t.Compute<GetBlockNumberReturnType>

export type GetBlockNumberData = GetBlockNumberQueryFnData

export function getBlockNumberQueryKey<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(options: GetBlockNumberOptions<config, chainId> = {} as never) {
  return ['getBlockNumber', filterQueryOptions(options)] as const
}

export type GetBlockNumberQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getBlockNumberQueryKey<config, chainId>>
