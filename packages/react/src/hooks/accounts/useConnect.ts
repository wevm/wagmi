import * as React from 'react'
import { ConnectArgs, ConnectResult, Connector, connect } from '@wagmi/core'
import { useMutation } from 'react-query'

import { useClient } from '../../context'
import { MutationConfig } from '../../types'

export type UseConnectArgs = Partial<ConnectArgs>

export type UseConnectConfig = MutationConfig<ConnectResult, Error, ConnectArgs>

export const mutationKey = (args: UseConnectArgs) =>
  [{ entity: 'connect', ...args }] as const

const mutationFn = (args: UseConnectArgs) => {
  const { connector, chainId } = args
  if (!connector) throw new Error('connector is required')
  return connect({ connector, chainId })
}

export function useConnect({
  chainId,
  connector,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseConnectArgs & UseConnectConfig = {}) {
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
  } = useMutation(mutationKey({ connector, chainId }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const connect = React.useCallback(
    (connectorOrArgs?: Partial<ConnectArgs> | ConnectArgs['connector']) => {
      let config: Partial<ConnectArgs>
      if (connectorOrArgs instanceof Connector) {
        const connector_ = connectorOrArgs
        config = {
          chainId,
          connector: connector_ ?? connector,
        }
      } else {
        const args = connectorOrArgs
        config = {
          chainId: args?.chainId ?? chainId,
          connector: args?.connector ?? connector,
        }
      }
      return mutate(<ConnectArgs>config)
    },
    [chainId, connector, mutate],
  )

  const connectAsync = React.useCallback(
    (connectorOrArgs?: Partial<ConnectArgs> | ConnectArgs['connector']) => {
      let config: Partial<ConnectArgs>
      if (connectorOrArgs instanceof Connector) {
        const connector_ = connectorOrArgs
        config = {
          chainId,
          connector: connector_ ?? connector,
        }
      } else {
        const args = connectorOrArgs
        config = {
          chainId: args?.chainId ?? chainId,
          connector: args?.connector ?? connector,
        }
      }
      return mutateAsync(<ConnectArgs>config)
    },
    [chainId, connector, mutateAsync],
  )

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
