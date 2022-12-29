import type { WatchContractEventConfig } from '@wagmi/core'
import type {
  Abi,
  AbiEvent,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
} from 'abitype'
import * as React from 'react'

import type { PartialBy } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'
import { useContract } from './useContract'

export type UseContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = PartialBy<
  WatchContractEventConfig<TAbi, TEventName> & GetListener<TAbi, TEventName>,
  'abi' | 'address' | 'eventName'
>

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

    const handler = (...event: any[]) =>
      (callbackRef.current as (...args: readonly unknown[]) => void)(...event)

    if (once) contract.once(eventName, handler)
    else contract.on(eventName, handler)

    return () => {
      contract.off(eventName, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName])
}

type GetListener<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  TArgs = AbiParametersToPrimitiveTypes<TAbiEvent['inputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? {
      /**
       * Callback when event is emitted
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      listener: (...args: unknown[]) => void
    }
  : {
      /** Callback when event is emitted */ listener: (
        ...args: TArgs extends readonly unknown[] ? TArgs : unknown[]
      ) => void
    }
