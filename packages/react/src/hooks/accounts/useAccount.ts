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
  const [previousStatus, setPreviousStatus] =
    React.useState<GetAccountResult['status']>()

  if (
    !!onConnect &&
    (previousStatus !== 'connected' || previousStatus === undefined) &&
    account.status === 'connected'
  )
    onConnect({
      address: account.address,
      connector: account.connector,
      isReconnected:
        previousStatus === 'reconnecting' ||
        // when `previousStatus` is `undefined`, it means connector connected immediately
        previousStatus === undefined,
    })

  if (
    !!onDisconnect &&
    previousStatus === 'connected' &&
    account.status === 'disconnected'
  )
    onDisconnect()

  if (account.status !== previousStatus) setPreviousStatus(account.status)

  return account
}
