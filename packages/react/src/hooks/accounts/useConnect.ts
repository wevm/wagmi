import * as React from 'react'
import { ConnectArgs, ConnectResult, Connector, connect } from '@wagmi/core'
import { UseMutationOptions, useMutation } from 'react-query'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export type UseConnectArgs = Partial<ConnectArgs>

type MutationOptions = UseMutationOptions<ConnectResult, Error, ConnectArgs>
export type UseConnectConfig = {
  /** Chain to connect */
  chainId?: number
  /** Function to invoke when an error is thrown while connecting. */
  onError?: MutationOptions['onError']
  /**
   * Function to invoke before connect and is passed same variables connect function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onMutate?: MutationOptions['onMutate']
  /** Function to invoke when connect is settled (either successfully connected, or an error has thrown). */
  onSettled?: MutationOptions['onSettled']
  /** Function to invoke when connect is successful. */
  onSuccess?: MutationOptions['onSuccess']
}

export const mutationKey = (args: UseConnectArgs) => [
  { entity: 'connect', ...args },
]

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
  const forceUpdate = useForceUpdate()

  const { mutate, mutateAsync, variables, ...connectMutation } = useMutation(
    mutationKey({ connector, chainId }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  React.useEffect(() => {
    // Trigger update when connectors change
    const unsubscribe = client.subscribe(
      (state) => state.connectors,
      forceUpdate,
    )
    return unsubscribe
  }, [client, forceUpdate])

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
    ...connectMutation,
    connect,
    connectAsync,
    connectors: client.connectors,
    pendingConnector: variables?.connector,
  } as const
}
