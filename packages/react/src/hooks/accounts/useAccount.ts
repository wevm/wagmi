import * as React from 'react'
import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'

import { useForceUpdate } from '../utils'
import { useClient } from '../../context'

export type UseAccountConfig = {
  onConnected?: ({
    address,
    connector,
  }: {
    address?: GetAccountResult['address']
    connector?: GetAccountResult['connector']
  }) => void
  onDisconnected?: () => void
}

export function useAccount({
  onConnected,
  onDisconnected,
}: UseAccountConfig = {}) {
  const forceUpdate = useForceUpdate()

  const { address, connector } = getAccount()
  const { status, subscribe } = useClient()

  React.useEffect(() => {
    // Trigger update when account (address/connector) changes
    const unwatch = watchAccount(forceUpdate)
    return unwatch
  }, [forceUpdate])

  React.useEffect(() => {
    // Trigger update when status changes
    const unsubscribe = subscribe(
      (state) => ({
        status: state.status,
      }),
      ({ status }, { status: prevStatus }) => {
        if (status === 'connected') onConnected?.(getAccount())
        if (prevStatus !== 'connecting' && status === 'disconnected')
          onDisconnected?.()
        forceUpdate()
      },
      {
        equalityFn: (selected, previous) => selected.status === previous.status,
      },
    )
    return unsubscribe
  }, [forceUpdate, subscribe])

  return {
    address,
    connector,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    isDisconnected: status === 'disconnected',
    isReconnecting: status === 'reconnecting',
    status: status,
  }
}
