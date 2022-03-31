import * as React from 'react'
import { ConnectArgs, ConnectResult, connect } from '@wagmi/core'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { useClient } from '../../context'

export type UseConnectArgs = Partial<ConnectArgs>

type MutationOptions = UseMutationOptions<ConnectResult, Error, ConnectArgs>
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

export const mutationKey = (args: UseConnectArgs) => [
  { entity: 'connect', ...args },
]

const mutationFn = (args: UseConnectArgs) => {
  const { connector } = args
  if (!connector) throw new Error('connector is required')
  return connect({ connector })
}

export function useConnect({
  connector,
  onBeforeConnect,
  onConnect,
  onError,
  onSettled,
}: UseConnectArgs & UseConnectConfig = {}) {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()

  const { data, error, mutate, mutateAsync, status, variables } = useMutation(
    mutationKey({ connector }),
    mutationFn,
    {
      onError,
      onMutate: onBeforeConnect,
      onSettled,
      onSuccess: onConnect,
    },
  )

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

  const connect = React.useCallback(
    (connector_?: ConnectArgs['connector']) =>
      mutate(<ConnectArgs>{ connector: connector_ ?? connector }),
    [connector, mutate],
  )

  const connectAsync = React.useCallback(
    (connector_?: ConnectArgs['connector']) =>
      mutateAsync(<ConnectArgs>{ connector: connector_ ?? connector }),
    [connector, mutateAsync],
  )

  return {
    activeConnector: client.connector,
    connect,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isConnected: status_ === 'connected',
    isConnecting: status_ === 'connecting',
    isDisconnected: status_ === 'disconnected',
    isError: status === 'error',
    isIdle: status_ === 'idle',
    isReconnecting: status_ === 'reconnecting',
    pendingConnector: variables?.connector,
    status: status_,
  } as const
}
