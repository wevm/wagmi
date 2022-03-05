import * as React from 'react'
import {
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorData,
} from '@wagmi/core'

import { useContext } from '../../context'
import { useCancel } from '../utils'

type State = {
  connector?: Connector
  error?: Error
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export const useConnect = () => {
  const {
    state: globalState,
    setState: setGlobalState,
    setLastUsedConnector,
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const connect = React.useCallback(
    async (
      connector: Connector,
    ): Promise<{
      data?: ConnectorData
      error?: Error
    }> => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const activeConnector = globalState?.connector
        if (connector === activeConnector)
          throw new ConnectorAlreadyConnectedError()

        setState((x) => ({
          ...x,
          loading: true,
          connector,
          error: undefined,
        }))
        const data = await connector.connect()

        if (!didCancel) {
          // Update connector globally only after successful connection
          setGlobalState((x) => ({ ...x, connector, data }))
          setLastUsedConnector(connector.name)
          setState((x) => ({ ...x, loading: false }))
        }
        return { data, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({
            ...x,
            connector: undefined,
            error,
            loading: false,
          }))
        }
        return { data: undefined, error }
      }
    },
    [cancelQuery, globalState.connector, setGlobalState, setLastUsedConnector],
  )

  // Keep connector in sync with global connector
  React.useEffect(() => {
    setState((x) => ({
      ...x,
      connector: globalState.connector,
      error: undefined,
    }))
    return cancelQuery
  }, [cancelQuery, globalState.connector])

  return [
    {
      data: {
        connected: !!globalState.data?.account,
        connector: state.connector,
        connectors: globalState.connectors,
      },
      error: state.error,
      loading: state.loading || globalState.connecting,
    },
    connect,
  ] as const
}
