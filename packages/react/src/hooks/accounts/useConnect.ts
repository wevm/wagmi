import { ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<ConnectResult, Error, Connector>

export type UseConnectConfig = {
  onConnect?: MutationOptions['onSuccess']
  onError?: MutationOptions['onError']
  onSettled?: MutationOptions['onSettled']
}

export function useConnect({
  onConnect,
  onError,
  onSettled,
}: UseConnectConfig = {}) {
  const client = useClient()
  const {
    error,
    isError,
    mutateAsync,
    status,
    variables: connector,
  } = useMutation<ConnectResult, Error, Connector>(
    (connector) => connect(connector),
    {
      onError,
      onSettled,
      onSuccess: onConnect,
    },
  )

  let status_:
    | Extract<UseMutationResult['status'], 'error' | 'idle'>
    | 'connected'
    | 'connecting'
  if (status === 'loading' || client.connecting) status_ = 'connecting'
  else if (status === 'success' || !!client.connector) status_ = 'connected'
  else status_ = status

  return {
    connect: mutateAsync,
    connector: connector ?? client.connector,
    connectors: client.connectors,
    error,
    isConnected: status_ === 'connected',
    isConnecting: status_ === 'connecting',
    isError,
    isIdle: status_ === 'idle',
    status: status_,
  } as const
}
