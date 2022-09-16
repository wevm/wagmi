import {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
} from 'abitype'
import { ethers } from 'ethers'
import * as React from 'react'

import { IsNever, NotEqual, Or } from '../../types/utils'
import { useProvider, useWebSocketProvider } from '../providers'
import { useContract } from './useContract'

export type UseContractEventConfig<
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
  callback: TArgs extends readonly any[]
    ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
      ? (...args: any) => void
      : (...args: TArgs) => void
    : never
  /** Receive only a single event */
  once?: boolean
}

export function useContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends TAbi extends Abi ? ExtractAbiEventNames<TAbi> : string,
>({
  addressOrName,
  chainId,
  contractInterface,
  callback,
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
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback

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
