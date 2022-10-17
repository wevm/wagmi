import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'
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
  const previousAccount = React.useRef<typeof account>()

  if (
    !!onConnect &&
    previousAccount.current?.status !== 'connected' &&
    account.status === 'connected'
  )
    onConnect({
      address: account.address,
      connector: account.connector,
      isReconnected: previousAccount.current?.status === 'reconnecting',
    })

  if (
    !!onDisconnect &&
    previousAccount.current?.status == 'connected' &&
    account.status === 'disconnected'
  )
    onDisconnect()

  previousAccount.current = account

  return account
}
