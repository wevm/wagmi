import type {
  WatchContractEventCallback,
  WatchContractEventConfig,
} from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'

import type { PartialBy } from '../../types'
import { usePublicClient, useWebSocketPublicClient } from '../viem'

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
  const publicClient = usePublicClient({ chainId })
  const webSocketPublicClient = useWebSocketPublicClient({ chainId })

  const unwatch = React.useRef<() => void>()
  React.useEffect(() => {
    if (!abi || !address || !eventName) return

    const publicClient_ = webSocketPublicClient || publicClient

    unwatch.current = publicClient_.watchContractEvent({
      abi,
      address,
      eventName,
      onLogs: listener,
    })
    return unwatch.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abi, address, eventName])

  return unwatch.current
}
