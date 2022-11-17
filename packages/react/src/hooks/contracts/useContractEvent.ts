import type { Event, IsNever, NotEqual, Or } from '@wagmi/core/internal'
import type {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  Narrow,
} from 'abitype'
import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'
import { useContract } from './useContract'

type GetListener<
  TAbiEvent extends AbiEvent,
  TAbi = unknown,
> = AbiParametersToPrimitiveTypes<
  TAbiEvent['inputs']
> extends infer TArgs extends readonly unknown[]
  ? // If `TArgs` is never or `TAbi` does not have the same shape as `Abi`, we were not able to infer args.
    Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Callback when event is emitted
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
         */
        listener: (...args: any) => void
      }
    : // We are able to infer args, spread the types.
      {
        /** Callback when event is emitted */
        listener: (...args: [...args: TArgs, event: Event<TAbiEvent>]) => void
      }
  : never

type ContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
  TEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : never,
> = {
  /** Contract address */
  address?: string
  /** Contract ABI */
  abi?: Narrow<TAbi>
  /** Chain id to use for provider */
  chainId?: number
  /** Event to listen for */
  eventName?: IsNever<TEventName> extends true ? string : TEventName
  /** Receive only a single event */
  once?: boolean
} & GetListener<TEvent, TAbi>

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
>(
  {
    address,
    chainId,
    abi,
    listener,
    eventName,
    once,
  }: UseContractEventConfig<TAbi, TEventName> = {} as any,
) {
  const provider = useProvider({ chainId })
  const webSocketProvider = useWebSocketProvider({ chainId })
  const contract = useContract({
    address,
    // TODO: Remove cast and still support `Narrow<TAbi>`
    abi: abi as Abi,
    signerOrProvider: webSocketProvider ?? provider,
  })
  const callbackRef = React.useRef(listener)
  callbackRef.current = listener

  React.useEffect(() => {
    if (!contract || !eventName) return

    const handler = (...event: any[]) => callbackRef.current(...event)

    if (once) contract.once(eventName, handler)
    else contract.on(eventName, handler)

    return () => {
      contract.off(eventName, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName])
}
