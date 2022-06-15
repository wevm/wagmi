import * as React from 'react'
import { getAccount, watchAccount } from '@wagmi/core'

import { useForceUpdate } from '../utils'
import { useClient } from '../../context'

export type UseAccountConfig = {
  onConnected?: () => void
  onDisconnected?: () => void
}

// TODO
// eslint-disable-next-line no-empty-pattern
export function useAccount({}: UseAccountConfig = {}) {
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
      forceUpdate,
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
