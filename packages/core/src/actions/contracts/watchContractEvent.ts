import type { Abi } from 'abitype'
import type { WatchContractEventParameters } from 'viem'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import { getPublicClient, getWebSocketPublicClient } from '../viem'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = Pick<
  WatchContractEventParameters<TAbi, TEventName>,
  'abi' | 'address' | 'eventName'
> & {
  chainId?: number
}

export type WatchContractEventCallback<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = WatchContractEventParameters<TAbi, TEventName>['onLogs']

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    address,
    abi,
    chainId,
    eventName,
  }: WatchContractEventConfig<TAbi, TEventName>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  let unwatch: () => void
  const watchEvent = async () => {
    if (unwatch) unwatch()

    const publicClient =
      getWebSocketPublicClient({ chainId }) || getPublicClient({ chainId })
    unwatch = publicClient.watchContractEvent({
      address,
      abi,
      eventName,
      onLogs: callback,
    })
  }

  watchEvent()
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ publicClient, webSocketPublicClient }) => ({
      publicClient,
      webSocketPublicClient,
    }),
    watchEvent,
    { equalityFn: shallow },
  )

  return () => {
    unwatch?.()
    unsubscribe()
  }
}
