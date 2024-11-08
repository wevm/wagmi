'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionCompute<
  UnionExactPartial<
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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
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

  // TODO(react@19): cleanup
  // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
  useEffect(() => {
    if (!enabled) return
    if (!onLogs) return
    return watchContractEvent(config, {
      ...(rest as any),
      chainId,
      onLogs,
    })
  }, [
    chainId,
    config,
    enabled,
    onLogs,
    ///
    rest.abi,
    rest.address,
    rest.args,
    rest.batch,
    rest.eventName,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.strict,
    rest.syncConnectedChain,
  ])
}
