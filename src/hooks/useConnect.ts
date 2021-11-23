import * as React from 'react'

import { Connector, WalletConnectConnector } from '../connectors'
import { useContext } from './useContext'

type State = {
  connecting: boolean
  error?: Error
}

const initialState: State = {
  connecting: false,
}

export const useConnect = () => {
  const [globalState, setGlobalState] = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const connect = React.useCallback(
    async (connector: Connector) => {
      try {
        if (connector === globalState.connector) return

        setState((x) => ({ ...x, connecting: true, error: undefined }))
        setGlobalState((x) => ({ ...x, connector }))

        // Manually reset connector if user already tried WalletConnect
        if (
          connector instanceof WalletConnectConnector &&
          connector.provider?.isWalletConnect
        )
          connector.provider = undefined

        const data = await connector.connect()
        setGlobalState((x) => ({ ...x, data }))
      } catch (error) {
        setState((x) => ({ ...x, error: error as Error }))
        setGlobalState((x) => ({ ...x, connector: undefined }))
      } finally {
        setState((x) => ({ ...x, connecting: false }))
      }
    },
    [globalState.connector, setGlobalState],
  )

  return [
    {
      connecting: state.connecting,
      connector: globalState.connector,
      connectors: globalState.connectors,
      error: state.error,
    },
    connect,
  ] as const
}
