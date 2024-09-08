import { watchContractEvent } from '@wagmi/core'
import type {
  Config,
  ResolvedRegister,
  WatchContractEventParameters,
  WatchContractEventReturnType,
} from '@wagmi/core'
// import {
//   type WriteContractData,
//   type WriteContractMutate,
//   type WriteContractMutateAsync,
//   type WriteContractVariables,
//   writeContractMutationOptions,
// } from '@wagmi/core/query'
import type { Abi, Address, ContractEventName, Log } from 'viem'

import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchContractEventParameters<
  // main
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  // extra, i guess?
  address extends Address | Record<number, Address> | undefined = undefined,
  args extends unknown[] = unknown[],
  batch extends boolean = true,
  poll extends boolean | undefined = undefined,
  pollingInterval extends number | undefined = undefined,
  syncConnectedChain extends boolean | undefined = undefined,
  onError extends (error: Error) => void = (error: Error) => void,
  onLogs extends (logs: Log[], prevLogs: Log[] | undefined) => void = (
    logs: Log[],
    prevLogs: Log[] | undefined,
  ) => void,
> = UnionCompute<
  UnionExactPartial<
    WatchContractEventParameters<abi, eventName, strict, config, chainId>
  > &
    ConfigParameter<config> &
    EnabledParameter & {
      address?: address
      args?: args
      batch?: batch
      poll?: poll
      pollingInterval?: pollingInterval
      syncConnectedChain?: syncConnectedChain
      onError?: onError
      onLogs?: onLogs
    }
>

export type UseWatchContractEventReturnType = WatchContractEventReturnType

/** To eventually be added to https://wagmi.sh/vue/api/composables/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  address extends Address | Record<number, Address> | undefined = undefined,
  args extends unknown[] = unknown[],
  batch extends boolean = true,
  poll extends boolean | undefined = undefined,
  pollingInterval extends number | undefined = undefined,
  syncConnectedChain extends boolean | undefined = undefined,
  onError extends (error: Error) => void = (error: Error) => void,
  onLogs extends (logs: Log[], prevLogs: Log[] | undefined) => void = (
    logs: Log[],
    prevLogs: Log[] | undefined,
  ) => void,
>(
  parameters: UseWatchContractEventParameters<
    abi,
    eventName,
    strict,
    config,
    chainId,
    address,
    args,
    batch,
    poll,
    pollingInterval,
    syncConnectedChain,
    onError,
    onLogs
  > = {} as any,
): UseWatchContractEventReturnType {
  const { config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  return watchContractEvent(config, {
    ...(rest as any),
    chainId: chainId,
  })
}
