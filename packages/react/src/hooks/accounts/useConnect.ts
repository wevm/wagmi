import {
  ConnectResult,
  Connector,
  ConnectorNotFoundError,
  connect as connect_,
} from '@wagmi/core'
import { useCallback, useEffect, useState } from 'react'
import { UseQueryOptions, useQuery } from 'react-query'

import { useClient } from '../../context'

type Query = UseQueryOptions<ConnectResult['data'], Error>

export type UseConnectArgs = {
  /** The default connector when `connect()` is invoked with no connector.  */
  defaultConnector?: Connector
  onConnect?: Query['onSuccess']
  onError?: Query['onError']
  onSettled?: Query['onSettled']
}

export function useConnect(args: UseConnectArgs) {
  const [connector, setConnector] = useState<Connector | undefined>()

  const client = useClient()
  const {
    data,
    error,
    isError,
    isLoading: isConnecting,
    isRefetching: isReconnecting,
    isSuccess: isConnected,
    refetch: reconnect,
    status,
  } = useQuery<ConnectResult['data'], Error>(
    'connect',
    async () => {
      if (!connector) return
      const { data } = await connect_(connector)
      return {
        account: data?.account,
        chain: data?.chain,
      }
    },
    {
      queryHash: 'connect',
      enabled: Boolean(connector),
      onError: args.onError,
      onSettled: args.onSettled,
      onSuccess: args.onConnect,
    },
  )

  // Reconnect whenever the connector changes
  useEffect(() => {
    if (connector) {
      reconnect()
    }
  }, [connector, reconnect])

  const connect = useCallback(
    (nextConnector?: Connector) => {
      // If the next connector is the same as the current connector,
      // attempt to reconnect.
      if (connector?.id === nextConnector?.id) {
        reconnect()
        return
      }
      // If a next connector is specified, set the connector to it (and connect).
      if (nextConnector) {
        setConnector(nextConnector)
        return
      }
      // If a next connector is not specified, set the connector to the default
      // one.
      if (args.defaultConnector) {
        setConnector(args.defaultConnector)
        return
      }
      // If no connector is specified, throw an error.
      throw new ConnectorNotFoundError()
    },
    [args.defaultConnector, connector?.id, reconnect],
  )

  return {
    connect,
    connector: client.connector ?? connector,
    connectors: client.connectors,
    data,
    error,
    isConnected,
    isConnecting,
    isReconnecting,
    isError,
    status,
  } as const
}
