'use client'
import {
  type Config,
  deepEqual,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import { useEffect, useRef } from 'react'
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

  const onLogsRef = useRef(onLogs)
  const onErrorRef = useRef(rest.onError)
  onLogsRef.current = onLogs
  onErrorRef.current = rest.onError

  const abiRef = useRef(rest.abi)
  const addressRef = useRef(rest.address)
  const argsRef = useRef(rest.args)
  if (!abiRef.current || !deepEqual(abiRef.current, rest.abi))
    abiRef.current = rest.abi
  if (!addressRef.current || !deepEqual(addressRef.current, rest.address))
    addressRef.current = rest.address
  if (!argsRef.current || !deepEqual(argsRef.current, rest.args))
    argsRef.current = rest.args

  // TODO(react@19): cleanup
  // biome-ignore lint/correctness/useExhaustiveDependencies: `rest` changes every render so only including properties in dependency array
  useEffect(() => {
    if (!enabled) return
    if (!onLogsRef.current) return
    return watchContractEvent(config, {
      ...(rest as any),
      chainId,
      onLogs: (logs) => onLogsRef.current?.(logs as any),
      onError: (error) => onErrorRef.current?.(error),
    })
  }, [
    chainId,
    config,
    enabled,
    ///
    abiRef.current,
    addressRef.current,
    argsRef.current,
    rest.batch,
    rest.eventName,
    rest.fromBlock,
    rest.poll,
    rest.pollingInterval,
    rest.strict,
    rest.syncConnectedChain,
  ])
}
