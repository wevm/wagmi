import type {
  GetAccountResult,
  PublicClient,
  WatchAccountCallback,
} from '@wagmi/core'
import { getAccount, watchAccount } from '@wagmi/core'
import * as React from 'react'
import { useConfig } from 'wagmi/context'

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
  const config = useConfig()
  const watchAccount_ = React.useCallback(
    (callback: WatchAccountCallback<PublicClient>) =>
      // Ideally this would be `watchAccountCore(callback, undefined, config)`,
      // but `watchAccountCore` does not take `config` (#2666).
      // For now, this works due to referential inequality.
      watchAccount(callback),
    [config],
  )
  const account = useSyncExternalStoreWithTracked(watchAccount_, getAccount)
  const previousAccountRef = React.useRef<typeof account>()
  const previousAccount = previousAccountRef.current

  React.useEffect(() => {
    if (
      previousAccount?.status !== 'connected' &&
      account.status === 'connected'
    ) {
      onConnect?.({
        address: account.address,
        connector: account.connector,
        isReconnected:
          previousAccount?.status === 'reconnecting' ||
          // if `previousAccount.status` is `undefined`, the connector connected immediately.
          previousAccount?.status === undefined,
      })
    }

    if (
      previousAccount?.status === 'connected' &&
      account.status === 'disconnected'
    ) {
      onDisconnect?.()
    }

    previousAccountRef.current = account
  }, [onConnect, onDisconnect, previousAccount, account])

  return account
}
