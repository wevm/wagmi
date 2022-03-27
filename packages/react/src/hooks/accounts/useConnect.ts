import * as React from 'react'
import { ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<ConnectResult, Error, Connector>

export type UseConnectConfig = {
  /**
   * Function to invoke before connect and is passed same variables connect function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onBeforeConnect?: MutationOptions['onMutate']
  /** Function to invoke when connect is successful. */
  onConnect?: MutationOptions['onSuccess']
  /** Function to invoke when an error is thrown while connecting. */
  onError?: MutationOptions['onError']
  /** Function to invoke when connect is settled (either successfully connected, or an error has thrown). */
  onSettled?: MutationOptions['onSettled']
}

export const mutationKey = [{ entity: 'connect' }]

const mutationFn = (connector: Connector) => connect(connector)

export function useConnect({
  onBeforeConnect,
  onConnect,
  onError,
  onSettled,
}: UseConnectConfig = {}) {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()

  const {
    data,
    error,
    mutate,
    mutateAsync,
    status,
    variables: connector,
  } = useMutation(mutationKey, mutationFn, {
    onError,
    onMutate: onBeforeConnect,
    onSettled,
    onSuccess: onConnect,
  })

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
    activeConnector: client.connector,
    connect: mutate,
    connectAsync: mutateAsync,
    connector,
    connectors: client.connectors,
    data,
    error,
    isConnected: status_ === 'connected',
    isConnecting: status_ === 'connecting',
    isDisconnected: status_ === 'disconnected',
    isError: status === 'error',
    isIdle: status_ === 'idle',
    isReconnecting: status_ === 'reconnecting',
    status: status_,
  } as const
}
