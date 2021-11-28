import * as React from 'react'

import { Connector, WalletConnectConnector } from '../connectors'
import { useContext } from './useContext'

type State = {
  connector?: Connector
  error?: Error
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export const useConnect = () => {
  const [globalState, setGlobalState, setLastUsedConnector] = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const connect = React.useCallback(
    async (connector: Connector) => {
      try {
        const activeConnector = globalState?.connector
        if (connector === activeConnector) return

        // Manually reset connector if user already tried WalletConnect
        if (
          connector instanceof WalletConnectConnector &&
          connector.provider?.isWalletConnect
        )
          connector.provider = undefined

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
      } catch (error) {
        setState((x) => ({ ...x, connector: undefined, error: error as Error }))
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    },
    [globalState.connector, setGlobalState, setLastUsedConnector],
  )

  // Keep connector in sync with global connector
  React.useEffect(() => {
    setState((x) => ({
      ...x,
      connector: globalState.connector,
      error: undefined,
    }))
  }, [globalState.connector])

  return [
    {
      connector: globalState.connector,
      connectors: globalState.connectors,
      error: state.error,
      loading: state.loading,
    },
    connect,
  ] as const
}
