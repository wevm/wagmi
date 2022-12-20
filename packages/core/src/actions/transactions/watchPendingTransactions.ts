import type { Transaction } from 'ethers'
import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import type { Provider } from '../../types'
import { debounce } from '../../utils'
import { getProvider, getWebSocketProvider } from '../providers'

export type WatchPendingTransactionsResult = Transaction
export type WatchPendingTransactionsArgs = { chainId?: number }
export type WatchPendingTransactionsCallback = (
  transaction: WatchPendingTransactionsResult,
) => void

export function watchPendingTransactions(
  args: WatchPendingTransactionsArgs,
  callback: WatchPendingTransactionsCallback,
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
      previousProvider?.off('pending', debouncedCallback)
    }
    provider.on('pending', debouncedCallback)
    previousProvider = provider
  }

  const provider_ =
    getWebSocketProvider({ chainId: args.chainId }) ??
    getProvider({ chainId: args.chainId })

  createListener(provider_)

  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_ = webSocketProvider ?? provider
      if (!args.chainId && provider_) {
        createListener(provider_)
      }
    },
    {
      equalityFn: shallow,
    },
  )

  return () => {
    unsubscribe()
    provider_?.off('pending', debouncedCallback)
    previousProvider?.off('pending', debouncedCallback)
  }
}
