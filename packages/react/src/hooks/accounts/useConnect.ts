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

export const connectMutationKey = 'connect' as const

const connectMutationFn = (connector: Connector) => connect(connector)

export function useConnect({
  onConnect,
  onError,
  onSettled,
}: UseConnectConfig = {}) {
  const client = useClient()
  const {
    error,
    isError,
    mutate,
    status,
    variables: connector,
  } = useMutation<ConnectResult, Error, Connector>(
    connectMutationKey,
    connectMutationFn,
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
    connect: mutate,
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
