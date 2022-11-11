import type {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  Narrow,
} from 'abitype'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import type { Event } from '../../types/contracts'
import type { IsNever, NotEqual, Or } from '../../types/utils'
import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

type ContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = {
  /** Contract address */
  address: string
  /** Contract ABI */
  abi: Narrow<TAbi>
  /** Chain id to use for provider */
  chainId?: number
  /** Event to listen for */
  eventName: IsNever<TEventName> extends true ? string : TEventName
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
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
> =
  // Create local variable `TArgs` based on event input parameters
  AbiParametersToPrimitiveTypes<
    TAbiEvent['inputs']
  > extends infer TArgs extends readonly unknown[]
    ? // If `TArgs` is never or `TAbi` does not have the same shape as `Abi`, we were not able to infer args.
      Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
      ? (...args: any) => void
      : // We are able to infer args, spread the types.
        (...args: [...args: TArgs, event: Event<TAbiEvent>]) => void
    : never

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    address,
    abi,
    chainId,
    eventName,
    once,
  }: WatchContractEventConfig<TAbi, TEventName>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  const handler = (...event: any[]) => callback(...event)

  let contract: ReturnType<typeof getContract>
  const watchEvent = async () => {
    if (contract) contract?.off(eventName, handler)

    const signerOrProvider =
      getWebSocketProvider({ chainId }) || getProvider({ chainId })
    contract = getContract({
      address,
      abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
      signerOrProvider,
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
    { equalityFn: shallow },
  )

  return () => {
    contract?.off(eventName, handler)
    unsubscribe()
  }
}
