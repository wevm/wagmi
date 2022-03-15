import * as React from 'react'
import { ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<ConnectResult, Error, Connector>

export type UseConnectConfig = {
  /** Function fires when connect is successful */
  onConnect?: MutationOptions['onSuccess']
  /** Function fires if connect encounters error */
  onError?: MutationOptions['onError']
  /** Function fires when connect is either successful or encounters error */
  onSettled?: MutationOptions['onSettled']
}

export function useConnect({
  onConnect,
  onError,
  onSettled,
}: UseConnectConfig = {}) {
  const wagmiClient = useClient()
  const {
    mutate,
    mutateAsync,
    status,
    variables: activeConnector,
    ...connectMutation
  } = useMutation('connect', (connector: Connector) => connect(connector), {
    onError,
    onSettled,
    onSuccess: onConnect,
  })

  const [client, setClient] = React.useState({
    status: wagmiClient.status,
    connector: wagmiClient.connector,
  })
  React.useEffect(() => {
    const unsubscribe = wagmiClient.subscribe(
      ({ status, connector }) => [status, connector],
      () =>
        setClient((x) => ({
          ...x,
          status: wagmiClient.status,
          connector: wagmiClient.connector,
        })),
    )
    return unsubscribe
  }, [wagmiClient])

  let status_:
    | Extract<UseMutationResult['status'], 'error' | 'idle'>
    | 'connected'
    | 'connecting'
    | 'disconnected'
    | 'reconnecting'
  if (client.status === 'reconnecting') status_ = 'reconnecting'
  else if (status === 'loading' || client.status === 'connecting')
    status_ = 'connecting'
  else if (status === 'success' || !!client.connector) status_ = 'connected'
  else if (!client.connector) status_ = 'disconnected'
  else status_ = status

  return {
    ...connectMutation,
    connect: mutate,
    connectAsync: mutateAsync,
    connector: activeConnector ?? client.connector,
    connectors: wagmiClient.connectors,
    isDisconnected: status_ === 'disconnected',
    isConnected: status_ === 'connected',
    isConnecting: status_ === 'connecting',
    isReconnecting: status_ === 'reconnecting',
    isIdle: status_ === 'idle',
    status: status_,
  } as const
}
