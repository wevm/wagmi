'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
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
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionEvaluate<
  UnionPartial<
    WatchContractEventParameters<abi, eventName, strict, config, chainId>
  > &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchContractEventReturnType = void

/** https://wagmi.sh/react/api/hooks/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchContractEventParameters<
    abi,
    eventName,
    strict,
    config,
    chainId
  > = {} as any,
): UseWatchContractEventReturnType {
  const { enabled = true, onLogs, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
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
