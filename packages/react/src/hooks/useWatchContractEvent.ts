'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import { type Evaluate, type ExactPartial } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { Abi, ContractEventName } from 'viem'
import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = Config,
> = Evaluate<
  ExactPartial<WatchContractEventParameters<abi, eventName, strict, config>> &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchContractEventReturnType = void

/** https://alpha.wagmi.sh/react/hooks/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseWatchContractEventParameters<
    abi,
    eventName,
    strict,
    config
  > = {},
): UseWatchContractEventReturnType {
  const { enabled = true, onLogs, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId()
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onLogs) return
    return watchContractEvent(config, {
      ...(rest as any),
      chainId,
      onLogs,
    })
  }, [chainId, config, enabled, rest, onLogs])
}
