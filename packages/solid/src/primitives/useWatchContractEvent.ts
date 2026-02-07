import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import type {
  ConfigParameter,
  EnabledParameter,
  UnionCompute,
  UnionExactPartial,
} from '@wagmi/core/internal'
import { type Accessor, createEffect, onCleanup } from 'solid-js'
import type { Abi, ContractEventName } from 'viem'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: useWatchContractEvent.Parameters<
    abi,
    eventName,
    strict,
    config,
    chainId
  > = () => ({}) as any,
): useWatchContractEvent.ReturnType {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))
  createEffect(() => {
    const {
      config: _,
      chainId = configChainId(),
      enabled = true,
      onLogs,
      ...rest
    } = parameters()
    if (!enabled) return
    if (!onLogs) return
    const unwatch = watchContractEvent(config(), {
      ...(rest as any),
      chainId,
      onLogs,
    })
    onCleanup(() => unwatch())
  })
}

export namespace useWatchContractEvent {
  export type Parameters<
    abi extends Abi | readonly unknown[] = Abi,
    eventName extends ContractEventName<abi> = ContractEventName<abi>,
    strict extends boolean | undefined = undefined,
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
  > = Accessor<
    SolidParameters<abi, eventName, strict, config, chainId>
  >

  export type ReturnType = void

  export type SolidParameters<
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
}
