import { ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, useMutation } from 'react-query'

import { useClient } from '../../context'

type Mutation = UseMutationOptions<ConnectResult, Error, Connector>

export type UseConnectArgs = {
  onConnect?: Mutation['onSuccess']
  onError?: Mutation['onError']
  onMutate?: Mutation['onMutate']
  onSettled?: Mutation['onSettled']
}

export function useConnect(args: UseConnectArgs) {
  const client = useClient()
  const {
    data,
    error,
    isError,
    isLoading: isConnecting,
    isSuccess: isConnected,
    mutateAsync,
    status,
    variables: connector,
  } = useMutation<ConnectResult, Error, Connector>(
    (connector) => connect(connector),
    {
      onError: args.onError,
      onMutate: args.onMutate,
      onSettled: args.onSettled,
      onSuccess: args.onConnect,
    },
  )

  return {
    connect: mutateAsync,
    connected: !!client.connector,
    connector: client.connector ?? connector,
    connectors: client.connectors,
    data,
    error,
    isConnected,
    isConnecting,
    isError,
    status,
  } as const
}
