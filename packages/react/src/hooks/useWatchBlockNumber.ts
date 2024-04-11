'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionEvaluate<
  UnionPartial<WatchBlockNumberParameters<config, chainId>> &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchBlockNumberReturnType = void

/** https://wagmi.sh/react/api/hooks/useWatchBlockNumber */
export function useWatchBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchBlockNumberParameters<config, chainId> = {} as any,
): UseWatchBlockNumberReturnType {
  const { enabled = true, onBlockNumber, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onBlockNumber) return
    return watchBlockNumber(config, {
      ...(rest as any),
      chainId,
      onBlockNumber,
    })
  }, [chainId, config, enabled, onBlockNumber, rest])
}
