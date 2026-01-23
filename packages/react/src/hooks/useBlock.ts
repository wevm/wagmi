'use client'
import { useQueryClient } from '@tanstack/react-query'
import type { Config, GetBlockErrorType, ResolvedRegister } from '@wagmi/core'
import type {
  Compute,
  UnionCompute,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockData,
  type GetBlockOptions,
  getBlockQueryOptions,
} from '@wagmi/core/query'
import type { BlockTag } from 'viem'
import type { ConfigParameter } from '../types/properties.js'
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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = Compute<
  GetBlockOptions<includeTransactions, blockTag, config, chainId, selectData> &
    ConfigParameter<config> & {
      watch?:
        | boolean
        | UnionCompute<
            UnionStrictOmit<
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
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
> = UseQueryReturnType<selectData, GetBlockErrorType>

/** https://wagmi.sh/react/hooks/useBlock */
export function useBlock<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockData<includeTransactions, blockTag, config, chainId>,
>(
  parameters: UseBlockParameters<
    includeTransactions,
    blockTag,
    config,
    chainId,
    selectData
  > = {},
): UseBlockReturnType<
  includeTransactions,
  blockTag,
  config,
  chainId,
  selectData
> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getBlockQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const queryClient = useQueryClient()
  useWatchBlocks({
    ...({
      config: parameters.config,
      chainId: parameters.chainId!,
      ...(typeof parameters.watch === 'object' ? parameters.watch : {}),
    } as UseWatchBlocksParameters),
    enabled: Boolean(
      (options.enabled ?? true) &&
        (typeof parameters.watch === 'object'
          ? parameters.watch.enabled
          : parameters.watch),
    ),
    onBlock(block) {
      queryClient.setQueryData(options.queryKey, block)
    },
  })
  return useQuery(options) as any
}
