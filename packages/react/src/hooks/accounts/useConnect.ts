import * as React from 'react'
import { ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<ConnectResult, Error, Connector>

export type UseConnectConfig = {
  /**
   * Function fires before connect function and is passed same variables connect function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onBeforeConnect?: MutationOptions['onMutate']
  /** Function fires when connect is successful */
  onConnect?: MutationOptions['onSuccess']
  /** Function fires if connect encounters error */
  onError?: MutationOptions['onError']
  /** Function fires when connect is either successful or encounters error */
  onSettled?: MutationOptions['onSettled']
}

export const mutationKey = 'connect'

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
    mutate,
    mutateAsync,
    status,
    variables: connector,
    // Remove these values from return
    /* eslint-disable @typescript-eslint/no-unused-vars */
    isSuccess,
    isLoading,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...connectMutation
  } = useMutation(mutationKey, mutationFn, {
    onError,
    onMutate: onBeforeConnect,
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
