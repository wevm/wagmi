'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchBlocksParameters,
  watchBlocks,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import { useEffect, useRef } from 'react'
import type { BlockTag } from 'viem'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchBlocksParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionCompute<
  UnionExactPartial<
    WatchBlocksParameters<includeTransactions, blockTag, config, chainId>
  > &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchBlocksReturnType = void

/** https://wagmi.sh/react/hooks/useWatchBlocks */
export function useWatchBlocks<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
  parameters: UseWatchBlocksParameters<
    includeTransactions,
    blockTag,
    config,
    chainId
  > = {} as any,
): UseWatchBlocksReturnType {
  const { enabled = true, onBlock, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  // store callbacks in refs to prevent re-subscriptions when they change.
  // refs are updated separately (in useEffect below) so the subscription
  // remains stable while always calling the latest callback version.
  const onBlockRef = useRef(onBlock)
  const onErrorRef = useRef(rest.onError)

  useEffect(() => {
    onBlockRef.current = onBlock
  }, [onBlock])

  useEffect(() => {
    onErrorRef.current = rest.onError
  }, [rest.onError])

  // TODO(react@19): cleanup
  // biome-ignore lint/correctness/useExhaustiveDependencies: `onBlock` and `onError` are excluded to prevent unnecessary re-subscriptions on render
  useEffect(() => {
    if (!enabled) return

    return watchBlocks(config, {
      ...(rest as any),
      chainId,
      onBlock: (block: any, prevBlock: any) =>
        onBlockRef.current?.(block, prevBlock),
      onError: (error) => onErrorRef.current?.(error),
    })
  }, [
    chainId,
    config,
    enabled,
    //
    rest.blockTag,
    rest.emitMissed,
    rest.emitOnBegin,
    rest.includeTransactions,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain,
  ])
}
