import type { GetTransactionReturnType } from 'viem'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { Provider, WebSocketProvider } from '../../types'
import { getProvider, getWebSocketProvider } from '../providers'

export type WatchPendingTransactionsResult = GetTransactionReturnType[]
export type WatchPendingTransactionsArgs = { chainId?: number }
export type WatchPendingTransactionsCallback = (
  transactions: WatchPendingTransactionsResult,
) => void

export function watchPendingTransactions(
  args: WatchPendingTransactionsArgs,
  callback: WatchPendingTransactionsCallback,
) {
  let unwatch: () => void
  const createListener = (provider: Provider | WebSocketProvider) => {
    if (unwatch) unwatch()
    unwatch = provider.watchPendingTransactions({
      onTransactions: async (hashes) => {
        const transactions = await Promise.all(
          hashes.map((hash) => provider.getTransaction({ hash })),
        )
        callback(transactions)
      },
      poll: true,
    })
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
    unwatch?.()
  }
}
