import type { QueryOptions } from '@tanstack/query-core'
import type { BlockTag } from 'viem'

import {
  type GetBlockErrorType,
  type GetBlockParameters,
  type GetBlockReturnType,
  getBlock,
} from '../actions/getBlock.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockOptions<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  ExactPartial<
    GetBlockParameters<includeTransactions, blockTag, config, chainId>
  > &
    ScopeKeyParameter
>

export function getBlockQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  includeTransactions extends boolean,
  blockTag extends BlockTag,
>(
  config: config,
  options: GetBlockOptions<includeTransactions, blockTag, config, chainId> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const block = await getBlock(config, parameters)
      return (block ?? null) as any
    },
    queryKey: getBlockQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>,
    GetBlockErrorType,
    GetBlockData<includeTransactions, blockTag, config, chainId>,
    GetBlockQueryKey<includeTransactions, blockTag, config, chainId>
  >
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
  options: GetBlockOptions<includeTransactions, blockTag, config, chainId> = {},
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
