import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import { Provider } from '../../types'
import { debounce } from '../../utils'
import { FetchBlockNumberResult, fetchBlockNumber } from './fetchBlockNumber'

export type WatchBlockNumberArgs = { listen: boolean }
export type WatchBlockNumberCallback = (
  blockNumber: FetchBlockNumberResult,
) => void

export function watchBlockNumber(
  args: WatchBlockNumberArgs,
  callback: WatchBlockNumberCallback,
) {
  let previousProvider: Provider
  const createListener = (provider: Provider) => {
    // We need to debounce the listener as we want to opt-out
    // of the behavior where ethers emits a "block" event for
    // every block that was missed in between the `pollingInterval`.
    // We are setting a wait time of 1 as emitting an event in
    // ethers takes ~0.1ms.
    const debouncedCallback = debounce(callback, 1)
    if (previousProvider) {
      previousProvider?.off('block', debouncedCallback)
    }
    provider.on('block', debouncedCallback)
    previousProvider = provider
  }

  const client = getClient()
  const provider_ = client.webSocketProvider ?? client.provider
  if (args.listen) createListener(provider_)

  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_ = webSocketProvider ?? provider
      if (args.listen && provider_) {
        createListener(provider_)
      }
      callback(await fetchBlockNumber())
    },
    {
      equalityFn: shallow,
    },
  )
  return () => {
    unsubscribe()
    provider_?.off('block', callback)
  }
}
