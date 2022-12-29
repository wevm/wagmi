import type { Transaction } from 'ethers'
import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId } from '../utils'

export type UseWatchPendingTransactionsConfig = {
  /** The chain ID to listen on. */
  chainId?: number
  /** Subscribe to changes */
  enabled?: boolean
  /** Function fires when a pending transaction enters the mempool. */
  listener: (transaction: Transaction) => void
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
    provider_.on('pending', listener)

    return () => {
      provider_.off('pending', listener)
    }
  }, [enabled, listener, provider, webSocketProvider])
}
