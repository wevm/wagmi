import type { WatchContractEventConfig } from '@wagmi/core'
import type { GetListener } from '@wagmi/core/types/events'
import type { Abi } from 'abitype'
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
    args,
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
