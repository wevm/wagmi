import {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
} from 'abitype'
import { Contract } from 'ethers'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import { IsNever, NotEqual, Or } from '../../types/utils'
import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
  TArgs = AbiParametersToPrimitiveTypes<TEvent['inputs']>,
> = {
  /** Contract address */
  addressOrName: Address
  /** Contract ABI */
  contractInterface: TAbi
  /** Chain id to use for provider */
  chainId?: number
  /** Event to listen for */
  eventName: TEventName
  /** Callback when event is emitted */
  listener: TArgs extends readonly any[]
    ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
      ? (...args: any) => void
      : (...args: TArgs) => void
    : never
  /** Receive only a single event */
  once?: boolean
}

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends TAbi extends Abi ? ExtractAbiEventNames<TAbi> : string,
>({
  addressOrName,
  contractInterface,
  chainId,
  eventName,
  listener,
  once,
}: WatchContractEventConfig<TAbi, TEventName>) {
  type Callback = Parameters<Contract['on']>[1]

  let contract: Contract
  const watchEvent = async () => {
    if (contract) {
      contract?.off(eventName, <Callback>listener)
    }

    contract = getContract({
      addressOrName,
      contractInterface,
      signerOrProvider:
        getWebSocketProvider({ chainId }) || getProvider({ chainId }),
    })

    if (once) contract.once(eventName, <Callback>listener)
    else contract.on(eventName, <Callback>listener)
  }

  watchEvent()
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({
      provider,
      webSocketProvider,
    }),
    watchEvent,
    {
      equalityFn: shallow,
    },
  )

  return () => {
    contract?.off(eventName, <Callback>listener)
    unsubscribe()
  }
}
