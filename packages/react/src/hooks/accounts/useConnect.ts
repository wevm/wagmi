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
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()
  const {
    mutate,
    mutateAsync,
    status,
    variables: connector,
    ...connectMutation
  } = useMutation('connect', (connector) => connect(connector), {
    onError,
    onSettled,
    onSuccess: onConnect,
  })

  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => ({
        connector: state.connector,
        status: state.status,
      }),
      () => forceUpdate(),
      {
        equalityFn: (selected, previous) =>
          selected.status === previous.status &&
          selected.connector === previous.connector,
      },
    )
    return unsubscribe
  }, [client])

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
    activeConnector: client.connector,
    connect: mutate,
    connectAsync: mutateAsync,
    connector,
    connectors: client.connectors,
    isConnected: status_ === 'connected',
    isConnecting: status_ === 'connecting',
    isDisconnected: status_ === 'disconnected',
    isIdle: status_ === 'idle',
    isReconnecting: status_ === 'reconnecting',
    status: status_,
  } as const
}
