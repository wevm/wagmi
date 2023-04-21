import type {
  OnTransactionsParameter,
  WatchPendingTransactionsParameters,
} from 'viem'
import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { PublicClient, WebSocketPublicClient } from '../../types'
import { getPublicClient, getWebSocketPublicClient } from '../viem'

export type WatchPendingTransactionsArgs = { chainId?: number }
export type WatchPendingTransactionsCallback =
  WatchPendingTransactionsParameters['onTransactions']
export type WatchPendingTransactionsResult = OnTransactionsParameter

export function watchPendingTransactions(
  args: WatchPendingTransactionsArgs,
  callback: WatchPendingTransactionsCallback,
) {
  let unwatch: () => void
  const createListener = (
    publicClient: PublicClient | WebSocketPublicClient,
  ) => {
    if (unwatch) unwatch()
    unwatch = publicClient.watchPendingTransactions({
      onTransactions: callback,
      poll: true,
    })
  }

  const publicClient_ =
    getWebSocketPublicClient({ chainId: args.chainId }) ??
    getPublicClient({ chainId: args.chainId })

  createListener(publicClient_)

  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ publicClient, webSocketPublicClient }) => ({
      publicClient,
      webSocketPublicClient,
    }),
    async ({ publicClient, webSocketPublicClient }) => {
      const publicClient_ = webSocketPublicClient ?? publicClient
      if (!args.chainId && publicClient_) {
        createListener(publicClient_)
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
