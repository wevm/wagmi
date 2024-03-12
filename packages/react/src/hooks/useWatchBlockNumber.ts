'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  deepEqual,
  watchBlockNumber,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
import { useEffect, useRef } from 'react'

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

  const subscription = useRef<WatchBlockNumberReturnType | undefined>(undefined)
  const watchBlockNumberParametersRef = useRef()
  const watchBlockNumberParameters = {
    ...(rest as any),
    chainId,
    onBlockNumber,
  } as const

  // compare previous params with new params using deep equality as useEffect doesn't do it by default
  const parametersEqual = deepEqual(
    watchBlockNumberParametersRef.current,
    watchBlockNumberParameters,
  )

  useEffect(() => {
    if (
      !parametersEqual &&
      enabled &&
      watchBlockNumberParameters.onBlockNumber
    ) {
      watchBlockNumberParametersRef.current = watchBlockNumberParameters
      subscription.current = watchBlockNumber(
        config,
        watchBlockNumberParameters,
      )
    }
    return undefined
  }, [config, enabled, parametersEqual, watchBlockNumberParameters])

  // Unsubscribe when the component unmounts and reset refs
  useEffect(() => {
    return () => {
      watchBlockNumberParametersRef.current = undefined
      subscription.current?.()
    }
  }, [])
}
