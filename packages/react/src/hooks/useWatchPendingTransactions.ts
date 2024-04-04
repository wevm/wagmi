'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchPendingTransactionsParameters,
  watchPendingTransactions,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchPendingTransactionsParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionEvaluate<
  UnionPartial<WatchPendingTransactionsParameters<config, chainId>> &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchPendingTransactionsReturnType = void

/** https://wagmi.sh/react/api/hooks/useWatchPendingTransactions */
export function useWatchPendingTransactions<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchPendingTransactionsParameters<
    config,
    chainId
  > = {} as any,
): UseWatchPendingTransactionsReturnType {
  const { enabled = true, onTransactions, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onTransactions) return
    return watchPendingTransactions(config, {
      ...(rest as any),
      chainId,
      onTransactions,
    })
  }, [chainId, config, enabled, onTransactions, rest])
}
