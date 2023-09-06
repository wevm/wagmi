'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchPendingTransactionsParameters,
  watchPendingTransactions,
} from '@wagmi/core'
import { type Evaluate, type ExactPartial } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchPendingTransactionsParameters<
  config extends Config = Config,
> = Evaluate<
  ExactPartial<WatchPendingTransactionsParameters<config>> &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchPendingTransactionsReturnType = void

/** https://alpha.wagmi.sh/react/hooks/useWatchPendingTransactions */
export function useWatchPendingTransactions<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseWatchPendingTransactionsParameters<config> = {},
): UseWatchPendingTransactionsReturnType {
  const { enabled = true, onTransactions, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId()
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onTransactions) return
    return watchPendingTransactions(config, {
      ...rest,
      chainId,
      onTransactions,
    })
  }, [chainId, config, enabled, rest, onTransactions])
}
