// TODO(viem-migration): write tests

import type { Abi } from 'abitype'
import type { WatchContractEventParameters } from 'viem'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import { getProvider, getWebSocketProvider } from '../providers'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = Omit<WatchContractEventParameters<TAbi, TEventName>, 'onLogs'> & {
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

    const provider =
      getWebSocketProvider({ chainId }) || getProvider({ chainId })
    unwatch = provider.watchContractEvent({
      address,
      abi,
      eventName,
      onLogs: callback,
    })
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
    unwatch?.()
    unsubscribe()
  }
}
