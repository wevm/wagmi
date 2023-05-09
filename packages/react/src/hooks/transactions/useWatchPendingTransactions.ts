import * as React from 'react'

import type { WatchPendingTransactionsCallback } from '../../actions'
import { useChainId } from '../utils'
import { usePublicClient, useWebSocketPublicClient } from '../viem'

export type UseWatchPendingTransactionsConfig = {
  /** The chain ID to listen on. */
  chainId?: number
  /** Subscribe to changes */
  enabled?: boolean
  /** Function fires when a pending transaction enters the mempool. */
  listener: WatchPendingTransactionsCallback
}

export function useWatchPendingTransactions({
  chainId: chainId_,
  enabled = true,
  listener,
}: UseWatchPendingTransactionsConfig) {
  const chainId = useChainId({ chainId: chainId_ })
  const publicClient = usePublicClient({ chainId })
  const webSocketPublicClient = useWebSocketPublicClient({ chainId })

  React.useEffect(() => {
    if (!enabled) return

    const publicClient_ = webSocketPublicClient ?? publicClient

    return publicClient_.watchPendingTransactions({
      onTransactions: listener,
    })
  }, [enabled, listener, publicClient, webSocketPublicClient])
}
