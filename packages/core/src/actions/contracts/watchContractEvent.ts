import type { Abi } from 'abitype'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { GetConfig, GetListener } from '../../types/events'

import { getProvider, getWebSocketProvider } from '../providers'
import { getContract } from './getContract'

export type WatchContractEventConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = GetConfig<TAbi, TEventName> & {
  /** Receive only a single event */
  once?: boolean
}

export type WatchContractEventCallback<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = GetListener<TAbi, TEventName>['listener']

export function watchContractEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>(
  {
    address,
    abi,
    chainId,
    eventName,
    args,
    once,
  }: WatchContractEventConfig<TAbi, TEventName>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  const handler = (...event: readonly unknown[]) =>
    (callback as (...args: readonly unknown[]) => void)(...event)

  let contract: ReturnType<typeof getContract>
  const watchEvent = async () => {
    const off = !!contract

    const signerOrProvider =
      getWebSocketProvider({ chainId }) || getProvider({ chainId })
    contract = getContract({
      address,
      abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
      signerOrProvider,
    })

    const eventFilterFn = contract.filters[eventName]
    const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName

    if (off) contract.off(eventFilter, handler)

    if (once) contract.once(eventFilter, handler)
    else contract.on(eventFilter, handler)
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
    if (contract) {
      const eventFilterFn = contract.filters[eventName]
      const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName
      contract.off(eventFilter, handler)
    }
    unsubscribe()
  }
}
