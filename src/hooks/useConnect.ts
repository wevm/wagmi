import * as React from 'react'

import { Connector } from '../connectors'
import { useContext } from './useContext'

type State = {
  connecting: boolean
  error?: Error
}

const initialState: State = {
  connecting: true,
}

export const useConnect = () => {
  const [globalState, setGlobalState] = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const connect = React.useCallback(
    async (connector: Connector) => {
      try {
        if (connector === globalState.connector) return

        setGlobalState((x) => ({ ...x, connector }))
        setState((x) => ({ ...x, connecting: true, error: undefined }))
        const data = await connector.activate()
        setGlobalState((x) => ({ ...x, data }))
      } catch (err) {
        console.log(err)
        setState((x) => ({ ...x, error: err as Error }))
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
