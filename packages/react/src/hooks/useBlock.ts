'use client'

import { useQueryClient } from '@tanstack/react-query'
import {
  type Config,
  type GetBlockErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import {
  type Evaluate,
  type UnionEvaluate,
  type UnionOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockData,
  type GetBlockOptions,
  type GetBlockQueryFnData,
  type GetBlockQueryKey,
  getBlockQueryOptions,
} from '@wagmi/core/query'
import type { BlockTag } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseWatchBlocksParameters,
  useWatchBlocks,
} from './useWatchBlocks.js'

export type UseBlockParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData,
> = Evaluate<
  GetBlockOptions<includeTransactions, blockTag, config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      GetBlockQueryFnData,
      GetBlockErrorType,
      selectData,
      GetBlockQueryKey<includeTransactions, blockTag, config, chainId>
    > & {
      watch?:
        | boolean
        | UnionEvaluate<
            UnionOmit<
              UseWatchBlocksParameters<
                includeTransactions,
                blockTag,
                config,
                chainId
              >,
              'chainId' | 'config' | 'onBlock' | 'onError'
            >
          >
        | undefined
    }
>

export type UseBlockReturnType<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  selectData = GetBlockData<includeTransactions, blockTag>,
> = UseQueryReturnType<selectData, GetBlockErrorType>

/** https://beta.wagmi.sh/react/hooks/useBlock */
export function useBlock<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  selectData = GetBlockData<includeTransactions, blockTag>,
>(
  parameters: UseBlockParameters<
    includeTransactions,
    blockTag,
    config,
    chainId,
    selectData
  > = {},
): UseBlockReturnType<includeTransactions, blockTag, selectData> {
  const { query = {}, watch } = parameters

  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const configChainId = useChainId()
  const chainId = parameters.chainId ?? configChainId

  const queryOptions = getBlockQueryOptions(config, { chainId })
  const enabled = Boolean(query.enabled ?? true)

  useWatchBlocks({
    ...{
      config: parameters.config,
      chainId: parameters.chainId!,
    },
    ...(typeof watch === 'object' ? (watch as UseWatchBlocksParameters) : {}),
    enabled: Boolean(
      enabled && (typeof watch === 'object' ? watch.enabled : watch),
    ),
    onBlock(block) {
      queryClient.setQueryData(queryOptions.queryKey, block)
    },
  })

  return useQuery({ ...queryOptions, ...query, enabled })
}
