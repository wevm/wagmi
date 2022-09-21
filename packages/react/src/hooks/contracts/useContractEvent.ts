import { IsNever, NotEqual, Or } from '@wagmi/core/internal'
import {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
} from 'abitype'
import { ethers } from 'ethers'
import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'
import { useContract } from './useContract'

type ContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
> = {
  /** Contract address */
  addressOrName: string
  /** Contract ABI */
  contractInterface: TAbi
  /** Chain id to use for provider */
  chainId?: number
  /** Event to listen for */
  eventName: TEventName
  /** Callback when event is emitted */
  listener: AbiParametersToPrimitiveTypes<
    TEvent['inputs']
  > extends infer TArgs extends readonly unknown[]
    ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
      ? (...args: any) => void
      : (...args: TArgs) => void
    : never
  /** Receive only a single event */
  once?: boolean
}

type GetConfig<T> = T extends {
  abi: infer TAbi extends Abi
  eventName: infer TEventName extends string
}
  ? ContractEventConfig<
      TAbi,
      ExtractAbiEventNames<TAbi>,
      ExtractAbiEvent<TAbi, TEventName>
    >
  : T extends {
      abi: infer TAbi extends readonly unknown[]
      eventName: infer TEventName extends string
    }
  ? ContractEventConfig<TAbi, TEventName>
  : ContractEventConfig

export type UseContractEventConfig<
  TAbi = Abi,
  TEventName = string,
> = GetConfig<{ abi: TAbi; eventName: TEventName }>

export function useContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>({
  addressOrName,
  chainId,
  contractInterface,
  listener,
  eventName,
  once,
}: UseContractEventConfig<TAbi, TEventName>) {
  const provider = useProvider({ chainId })
  const webSocketProvider = useWebSocketProvider({ chainId })
  const contract = useContract({
    addressOrName,
    contractInterface,
    signerOrProvider: webSocketProvider ?? provider,
  })
  const callbackRef = React.useRef(listener)
  callbackRef.current = listener

  React.useEffect(() => {
    const handler = (...event: any[]) => callbackRef.current(...event)

    const contract_ = <ethers.Contract>(<unknown>contract)
    if (once) contract_.once(eventName, handler)
    else contract_.on(eventName, handler)

    return () => {
      contract_.off(eventName, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName])
}
