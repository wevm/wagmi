import * as React from 'react'
import { GetTransactionReturnType } from 'viem'

import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId } from '../utils'

export type UseWatchPendingTransactionsConfig = {
  /** The chain ID to listen on. */
  chainId?: number
  /** Subscribe to changes */
  enabled?: boolean
  /** Function fires when a pending transaction enters the mempool. */
  listener: (transactions: GetTransactionReturnType[]) => void
}

export function useWatchPendingTransactions({
  chainId: chainId_,
  enabled = true,
  listener,
}: UseWatchPendingTransactionsConfig) {
  const chainId = useChainId({ chainId: chainId_ })
  const provider = useProvider({ chainId })
  const webSocketProvider = useWebSocketProvider({ chainId })

  React.useEffect(() => {
    if (!enabled) return

    const provider_ = webSocketProvider ?? provider

    return provider_.watchPendingTransactions({
      onTransactions: async (hashes) => {
        const transactions = await Promise.all(
          hashes.map((hash) => provider.getTransaction({ hash })),
        )
        listener(transactions)
      },
    })
  }, [enabled, listener, provider, webSocketProvider])
}
