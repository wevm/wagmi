import type { GetAccountResult, WatchAccountCallback } from '@wagmi/core'
import { getAccount, getClient } from '@wagmi/core'
import * as React from 'react'

import { useSyncExternalStoreWithTracked } from '../utils'

export type UseAccountConfig = {
  /** Function to invoke when connected */
  onConnect?({
    address,
    connector,
    isReconnected,
  }: {
    address?: GetAccountResult['address']
    connector?: GetAccountResult['connector']
    isReconnected: boolean
  }): void
  /** Function to invoke when disconnected */
  onDisconnect?(): void
}

export function useAccount({ onConnect, onDisconnect }: UseAccountConfig = {}) {
  const watchAccount = React.useCallback(
    (callback: WatchAccountCallback) => {
      const client = getClient()
      const unsubscribe = client.subscribe(
        (state) => ({
          address: state.data?.account,
          connector: state.connector,
          status: state.status,
        }),
        (curr, prev) => {
          if (
            !!onConnect &&
            prev.status !== 'connected' &&
            curr.status === 'connected'
          )
            onConnect({
              address: curr.address,
              connector: curr.connector,
              isReconnected: prev.status === 'reconnecting',
            })

          if (
            !!onDisconnect &&
            prev.status === 'connected' &&
            curr.status === 'disconnected'
          )
            onDisconnect()

          return callback(getAccount())
        },
      )

      return unsubscribe
    },
    [onConnect, onDisconnect],
  )

  const account = useSyncExternalStoreWithTracked(watchAccount, getAccount)

  // Check for immediate reconnection on mount before subscribe to store
  // e.g. `previousStatusRef.current === undefined` and `status === 'connected'`
  const previousStatusRef = React.useRef<GetAccountResult['status']>()
  const { address, connector, status } = account
  React.useEffect(() => {
    if (
      !!onConnect &&
      previousStatusRef.current === undefined &&
      status === 'connected'
    )
      onConnect({ address, connector, isReconnected: true })

    previousStatusRef.current = status
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return account
}
