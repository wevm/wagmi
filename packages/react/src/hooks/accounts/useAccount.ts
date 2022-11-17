import type { GetAccountResult } from '@wagmi/core'
import { getAccount, watchAccount } from '@wagmi/core'
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
  const account = useSyncExternalStoreWithTracked(watchAccount, getAccount)
  const previousAccountRef = React.useRef<typeof account>()
  const previousAccount = previousAccountRef.current ?? ({} as typeof account)

  if (
    !!onConnect &&
    (previousAccount.status !== 'connected' ||
      previousAccount.status === undefined) &&
    account.status === 'connected'
  )
    onConnect({
      address: account.address,
      connector: account.connector,
      isReconnected:
        previousAccount.status === 'reconnecting' ||
        // when `previousAccount.status` is `undefined`, it means connector connected immediately
        previousAccount.status === undefined,
    })

  if (
    !!onDisconnect &&
    previousAccount.status === 'connected' &&
    account.status === 'disconnected'
  )
    onDisconnect()

  previousAccountRef.current = account

  return account
}
