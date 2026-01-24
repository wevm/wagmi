import type { BlockTag } from 'viem'

import {
  type GetBlockErrorType,
  type GetBlockParameters,
  type GetBlockReturnType,
  getBlock,
} from '../actions/getBlock.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockOptions<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = Compute<
  ExactPartial<
    GetBlockParameters<includeTransactions, blockTag, config, chainId>
  > &
    ScopeKeyParameter
> &
  QueryParameter<
    GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>,
    GetBlockErrorType,
    selectData,
    GetBlockQueryKey<includeTransactions, blockTag, config, chainId>
  >

export function getBlockQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
>(
  config: config,
  options: GetBlockOptions<
    includeTransactions,
    blockTag,
    config,
    chainId,
    selectData
  > = {},
): GetBlockQueryOptions<
  includeTransactions,
  blockTag,
  config,
  chainId,
  selectData
> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const block = await getBlock(config, parameters as any)
      return (block ?? null) as any
    },
    queryKey: getBlockQueryKey(options),
  }
}

export type GetBlockQueryFnData<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetBlockReturnType<includeTransactions, blockTag, config, chainId>

export type GetBlockData<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>

export function getBlockQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
  options: Compute<
    ExactPartial<
      GetBlockParameters<includeTransactions, blockTag, config, chainId>
    > &
      ScopeKeyParameter
  > = {},
) {
  return ['block', filterQueryOptions(options)] as const
}

export type GetBlockQueryKey<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<
  typeof getBlockQueryKey<config, chainId, includeTransactions, blockTag>
>

export type GetBlockQueryOptions<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = QueryOptions<
  GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>,
  GetBlockErrorType,
  selectData,
  GetBlockQueryKey<includeTransactions, blockTag, config, chainId>
>
