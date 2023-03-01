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

  const mutationData = createMutation(
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
    mutationData.mutate({
      chainId: args?.chainId ?? props?.chainId,
      connector: args?.connector ?? props?.connector ?? client.connectors[0],
    })

  const connectAsync = (args?: Partial<ConnectArgs>) => {
    return mutationData.mutateAsync({
      chainId: args?.chainId ?? props?.chainId,
      connector: args?.connector ?? props?.connector ?? client.connectors[0],
    })
  }

  return {
    connect,
    connectAsync,
    connectors: client.connectors,
    pendingConnector: mutationData.variables?.connector,
    mutationData,
  } as const
}
