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
import type * as t from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBlockOptions<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<
    GetBlockParameters<includeTransactions, blockTag, config, chainId>
  > &
    ScopeKeyParameter
>

export function getBlockQueryOptions<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  options: GetBlockOptions<
    includeTransactions,
    blockTag,
    config,
    chainId
  > = {} as never,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const result = await getBlock(config, parameters as never)
      return (result ?? null) as never
    },
    queryKey: getBlockQueryKey(options as never),
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
> = t.Compute<
  GetBlockReturnType<includeTransactions, blockTag, config, chainId>
>

export type GetBlockData<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>

export function getBlockQueryKey<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  options: GetBlockOptions<
    includeTransactions,
    blockTag,
    config,
    chainId
  > = {} as never,
) {
  return ['getBlock', filterQueryOptions(options)] as const
}

export type GetBlockQueryKey<
  includeTransactions extends boolean,
  blockTag extends BlockTag,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<
  typeof getBlockQueryKey<includeTransactions, blockTag, config, chainId>
>
