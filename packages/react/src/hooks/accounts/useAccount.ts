import * as React from 'react'
import { GetAccountResult, getAccount, watchAccount } from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { useForceUpdate, useQuery } from '../utils'
import { useClient } from '../../context'

export type UseAccountConfig = {
  onConnected?: () => void
  onDisconnected?: () => void
}

export const queryKey = () => [{ entity: 'account' }] as const

const queryFn = () => {
  const result = getAccount()
  if (result.address) return result
  return null
}

// TODO
// eslint-disable-next-line no-empty-pattern
export function useAccount({}: UseAccountConfig = {}) {
  const client = useClient()
  const forceUpdate = useForceUpdate()
  const queryClient = useQueryClient()

  const { data } = useQuery<GetAccountResult | null>(queryKey(), queryFn, {
    staleTime: 0,
  })

  React.useEffect(() => {
    const unwatch = watchAccount((data) => {
      queryClient.setQueryData(queryKey(), data?.address ? data : null)
    })
    return unwatch
  }, [queryClient])

  React.useEffect(() => {
    // Trigger update when connector or status change
    const unsubscribe = client.subscribe(
      (state) => ({
        connector: state.connector,
        status: state.status,
      }),
      forceUpdate,
      {
        equalityFn: (selected, previous) =>
          selected.connector === previous.connector &&
          selected.status === previous.status,
      },
    )
    return unsubscribe
  }, [client, forceUpdate])

  return {
    activeConnector: client.connector,
    address: data?.address,
    connector: data?.connector,
    isConnected: client.status === 'connected',
    isConnecting: client.status === 'connecting',
    isDisconnected: client.status === 'disconnected',
    isReconnecting: client.status === 'reconnecting',
    status: client.status,
  }
}
