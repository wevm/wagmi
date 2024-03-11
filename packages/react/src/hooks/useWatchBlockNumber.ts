'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  deepEqual,
  watchBlockNumber,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
import { useEffect, useRef } from 'react'
import type { WatchBlockNumberReturnType } from 'viem'
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
  const configChainId = useChainId()

  const chainId = parameters.chainId ?? configChainId

  const watchBlockNumberParameters =
    enabled && onBlockNumber
      ? {
          onBlockNumber,
          chainId,
          ...(rest as any),
        }
      : undefined

  const watchBlockNumberParametersRef = useRef(watchBlockNumberParameters)
  const subscription = useRef<WatchBlockNumberReturnType | undefined>(undefined)

  useEffect(() => {
    // Check for deep equality as useEffect doesn't do it by default
    const parametersEqual = deepEqual(
      watchBlockNumberParametersRef.current,
      watchBlockNumberParameters,
    )

    if (
      (!parametersEqual || !subscription.current) &&
      enabled &&
      watchBlockNumberParameters
    ) {
      watchBlockNumberParametersRef.current = watchBlockNumberParameters

      subscription.current = watchBlockNumber(
        config,
        watchBlockNumberParametersRef.current,
      )
    }
  }, [
    enabled,
    config,
    watchBlockNumberParameters,
    watchBlockNumberParametersRef,
  ])

  useEffect(() => {
    return () => {
      subscription.current?.()
      subscription.current = undefined
    }
  }, [])
}
