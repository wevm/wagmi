import * as React from 'react'
import { Connector } from 'wagmi-private'

import { useContext } from '../../context'

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

  const connect = React.useCallback(
    async (connector: Connector) => {
      try {
        const activeConnector = globalState?.connector
        if (connector === activeConnector) return

        setState((x) => ({
          ...x,
          loading: true,
          connector,
          error: undefined,
        }))
        const data = await connector.connect()

        // Update connector globally only after successful connection
        setGlobalState((x) => ({ ...x, connector, data }))
        setLastUsedConnector(connector.name)
        setState((x) => ({ ...x, loading: false }))
        return { data, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, connector: undefined, error, loading: false }))
        return { data: undefined, error }
      }
    },
    [globalState.connector, setGlobalState, setLastUsedConnector],
  )

  // Keep connector in sync with global connector
  React.useEffect(() => {
    let didCancel = false
    if (didCancel) return

    setState((x) => ({
      ...x,
      connector: globalState.connector,
      error: undefined,
    }))

    return () => {
      didCancel = true
    }
  }, [globalState.connector])

  return [
    {
      data: {
        connected: !!globalState.data?.account,
        connector: state.connector,
        connectors: globalState.connectors,
      },
      error: state.error,
      loading: state.loading,
    },
    connect,
  ] as const
}
