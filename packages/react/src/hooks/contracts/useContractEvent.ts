import { GetEventConfig } from '@wagmi/core/internal'
import { Abi } from 'abitype'
import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'
import { useContract } from './useContract'

export type UseContractEventConfig<
  TAbi = Abi,
  TEventName = string,
> = GetEventConfig<
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
  {
    isAddressOptional: true
    isArgsOptional: true
    withListener: true
  }
>

export function useContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>({
  addressOrName,
  args,
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
    if (!contract) return

    const handler = (...event: any[]) => callbackRef.current(...event)

    const eventFilterFn = contract.filters[eventName]
    const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName

    if (once) contract.once(eventFilter, handler)
    else contract.on(eventFilter, handler)

    return () => {
      contract.off(eventFilter, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName, args])
}
