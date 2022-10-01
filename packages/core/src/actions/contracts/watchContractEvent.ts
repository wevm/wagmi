import { Abi, AbiEvent, ExtractAbiEvent } from 'abitype'
import { Contract } from 'ethers'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import {
  DefaultOptions,
  GetConfig,
  GetListener,
  Options,
} from '../../types/events'
import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TOptions extends Options = DefaultOptions,
> = GetConfig<
  {
    /** Contract ABI */
    contractInterface: TAbi
    /** Event to listen for */
    eventName: TEventName
    /** Chain id to use for provider */
    chainId?: number
    /** Receive only a single event */
    once?: boolean
  },
  TOptions
>

export type WatchContractEventCallback<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
> = GetListener<TAbi, TEvent>['listener']

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    addressOrName,
    args,
    contractInterface,
    chainId,
    eventName,
    once,
  }: WatchContractEventConfig<TAbi, TEventName>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  const handler = (...event: any[]) => callback(...event)

  let contract: Contract
  const watchEvent = async () => {
    const off = !!contract

    contract = getContract({
      addressOrName,
      contractInterface,
      signerOrProvider:
        getWebSocketProvider({ chainId }) || getProvider({ chainId }),
    })

    const eventFilterFn = contract.filters[eventName]
    const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName

    if (off) contract.off(eventFilter, handler)

    if (once) contract.once(eventFilter, handler)
    else contract.on(eventFilter, handler)
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
    if (contract) {
      const eventFilterFn = contract.filters[eventName]
      const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName
      contract.off(eventFilter, handler)
    }
    unsubscribe()
  }
}
