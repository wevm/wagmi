import {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
} from 'abitype'
import { Contract } from 'ethers'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import { IsNever, NotEqual, Or } from '../../types/utils'
import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

type ContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = {
  /** Contract address */
  addressOrName: string
  /** Contract ABI */
  contractInterface: TAbi
  /** Chain id to use for provider */
  chainId?: number
  /** Event to listen for */
  eventName: TEventName
  /** Receive only a single event */
  once?: boolean
}

type GetConfig<T> = T extends {
  abi: infer TAbi extends Abi
}
  ? ContractEventConfig<TAbi, ExtractAbiEventNames<TAbi>>
  : T extends {
      abi: infer TAbi extends readonly unknown[]
      eventName: infer TEventName extends string
    }
  ? ContractEventConfig<TAbi, TEventName>
  : ContractEventConfig

export type WatchContractEventConfig<
  TAbi = Abi,
  TEventName = string,
> = GetConfig<{ abi: TAbi; eventName: TEventName }>

export type WatchContractEventCallback<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
  TArgs = AbiParametersToPrimitiveTypes<TEvent['inputs']>,
> = TArgs extends readonly any[]
  ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
    ? (...args: any) => void
    : (...args: TArgs) => void
  : never

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    addressOrName,
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
    if (contract) contract?.off(eventName, handler)

    contract = getContract({
      addressOrName,
      contractInterface,
      signerOrProvider:
        getWebSocketProvider({ chainId }) || getProvider({ chainId }),
    })

    if (once) contract.once(eventName, handler)
    else contract.on(eventName, handler)
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
    contract?.off(eventName, handler)
    unsubscribe()
  }
}
