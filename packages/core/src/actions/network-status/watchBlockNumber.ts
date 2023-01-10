import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { Provider } from '../../types'
import { debounce } from '../../utils'
import { getProvider, getWebSocketProvider } from '../providers'
import type { FetchBlockNumberResult } from './fetchBlockNumber'
import { fetchBlockNumber } from './fetchBlockNumber'

export type WatchBlockNumberArgs = { chainId?: number; listen: boolean }
export type WatchBlockNumberCallback = (
  blockNumber: FetchBlockNumberResult,
) => void

export function watchBlockNumber(
  args: WatchBlockNumberArgs,
  callback: WatchBlockNumberCallback,
) {
  // We need to debounce the listener as we want to opt-out
  // of the behavior where ethers emits a "block" event for
  // every block that was missed in between the `pollingInterval`.
  // We are setting a wait time of 1 as emitting an event in
  // ethers takes ~0.1ms.
  const debouncedCallback = debounce(callback, 1)

  let previousProvider: Provider
  const createListener = (provider: Provider) => {
    if (previousProvider) {
      previousProvider?.off('block', debouncedCallback)
    }
    provider.on('block', debouncedCallback)
    previousProvider = provider
  }

  const provider_ =
    getWebSocketProvider({ chainId: args.chainId }) ??
    getProvider({ chainId: args.chainId })
  if (args.listen) createListener(provider_)

  let active = true
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_ = webSocketProvider ?? provider
      if (args.listen && !args.chainId && provider_) {
        createListener(provider_)
      }

      const blockNumber = await fetchBlockNumber({ chainId: args.chainId })
      if (!active) return
      callback(blockNumber)
    },
    {
      equalityFn: shallow,
    },
  )
  return () => {
    active = false
    unsubscribe()
    provider_?.off('block', debouncedCallback)
    previousProvider?.off('block', debouncedCallback)
  }
}
