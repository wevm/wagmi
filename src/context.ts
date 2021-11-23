import * as React from 'react'

import { Connector, Data, InjectedConnector } from './connectors'

type State = {
  connector?: Connector
  data?: Data
  error?: Error
}

type ContextValue = [
  {
    /** Connectors used for linking accounts */
    connectors: Connector[]
    /** Active connector */
    connector?: State['connector']
    /** Active data */
    data?: State['data']
  },
  React.Dispatch<React.SetStateAction<State>>,
]

export const Context = React.createContext<ContextValue | null>(null)

type Props = {
  /** Connectors used for linking accounts */
  connectors?: Connector[]
  /** Whether provider should attempt to connect on mount */
  eagerConnect?: boolean
}

export const Provider = ({
  children,
  connectors = [new InjectedConnector()],
  eagerConnect,
}: React.PropsWithChildren<Props>) => {
  const [state, setState] = React.useState<{
    connector?: Connector
    data?: Data
    error?: Error
  }>({})

  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const maybeConnect = async () => {
      const connector = new InjectedConnector()
      const isAuthorized = await connector.isAuthorized()
      if (!isAuthorized) return
      try {
        const data = await connector.connect()
        setState((x) => ({ ...x, connector, data }))
      } catch (error) {
        console.log(error)
      }
    }

    if (!eagerConnect) return
    maybeConnect()
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  // Make sure connectors close
  React.useEffect(() => {
    return () => {
      if (!state.connector) return
      state.connector.disconnect()
    }
  }, [state.connector])

  // Watch connector for events
  React.useEffect(() => {
    if (!state.connector) return

    const handleChange = (data: Data) => {
      console.log('handleChange', data)
      setState((x) => ({ ...x, data }))
    }
    const handleDisconnect = () => {
      console.log('handleDisconnect')
      setState({})
    }
    const handleError = (error: Error) => {
      console.log('handleError')
      setState((x) => ({ ...x, error }))
    }

    state.connector.on('change', handleChange)
    state.connector.on('disconnect', handleDisconnect)
    state.connector.on('error', handleError)

    return () => {
      if (!state.connector) return
      state.connector.off('change', handleChange)
      state.connector.off('disconnect', handleDisconnect)
      state.connector.off('error', handleError)
    }
  }, [state.connector])

  const value = [
    {
      connectors,
      connector: state.connector,
      data: state.data,
    },
    setState,
  ] as ContextValue

  return React.createElement(Context.Provider, { value }, children)
}
