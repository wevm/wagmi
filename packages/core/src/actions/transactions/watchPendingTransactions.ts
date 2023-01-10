import type { Transaction } from 'ethers'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { Provider } from '../../types'
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
  let previousProvider: Provider
  const createListener = (provider: Provider) => {
    if (previousProvider) {
      previousProvider?.off('pending', callback)
    }
    provider.on('pending', callback)
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
    provider_?.off('pending', callback)
    previousProvider?.off('pending', callback)
  }
}
