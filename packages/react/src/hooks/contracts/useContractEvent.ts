import type {
  WatchContractEventCallback,
  WatchContractEventConfig,
} from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'

import type { PartialBy } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'

export type UseContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = PartialBy<
  WatchContractEventConfig<TAbi, TEventName>,
  'abi' | 'address' | 'eventName'
> & {
  listener: WatchContractEventCallback<TAbi, TEventName>
}

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
  }: UseContractEventConfig<TAbi, TEventName> = {} as any,
) {
  const provider = useProvider({ chainId })
  const webSocketProvider = useWebSocketProvider({ chainId })

  React.useEffect(() => {
    if (!abi || !address || !eventName) return

    const provider_ = webSocketProvider || provider

    const unwatch = provider_.watchContractEvent({
      abi,
      address,
      eventName,
      onLogs: listener,
    })
    return unwatch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abi, address, eventName])
}
