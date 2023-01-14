import { createMutation } from '@tanstack/solid-query'
import { connect as _connect } from '@wagmi/core'
import type { ConnectResult, Connector } from '@wagmi/core'
import type { Accessor } from 'solid-js'

import { useClient } from '../../context'
import type { MutationConfig } from '../../types'

export type ConnectArgs = {
  chainId?: Accessor<number>
  connector?: Connector<any, any, any>
}

export type UseConnectArgs = Partial<ConnectArgs>
export type UseConnectConfig = MutationConfig<ConnectResult, Error, ConnectArgs>

export const mutationKey = (args: UseConnectArgs) =>
  [
    {
      entity: 'connect',
      chainId: args?.chainId?.(),
      connector: args.connector,
    },
  ] as const

const mutationFn = (args: UseConnectArgs) => {
  if (!args.connector) throw new Error('connector is required')
  return _connect({ chainId: args?.chainId?.(), connector: args.connector })
}

export const useConnect = (props?: UseConnectArgs & UseConnectConfig) => {
  const client = useClient()

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = createMutation(
    mutationKey({
      chainId: props?.chainId,
      connector: props?.connector,
    }),
    mutationFn,
    {
      onError: props?.onError,
      onMutate: props?.onMutate,
      onSettled: props?.onSettled,
      onSuccess: props?.onSuccess,
    },
  )

  const connect = (args?: Partial<ConnectArgs>) =>
    mutate({
      chainId: args?.chainId ?? props?.chainId,
      connector: args?.connector ?? (props?.connector || client.connectors[0]),
    })

  const connectAsync = (args?: Partial<ConnectArgs>) => {
    return mutateAsync({
      chainId: args?.chainId ?? props?.chainId,
      connector: args?.connector ?? props?.connector,
    })
  }

  return {
    connect,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector: variables?.connector,
    reset,
    status,
    variables,
  } as const
}
