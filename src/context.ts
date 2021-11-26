import * as React from 'react'

import { Connector, Data, InjectedConnector } from './connectors'
import { useLocalStorage } from './hooks'

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
  /** Whether provider should attempt to connect on mount */
  autoConnect?: boolean
  /** Connectors used for linking accounts */
  connectors?: Connector[]
  /** Key for saving wallet preference to browser */
  localStorageKey?: string
}

export const Provider = ({
  autoConnect,
  children,
  connectors = [new InjectedConnector()],
  localStorageKey = 'wagmiWallet',
}: React.PropsWithChildren<Props>) => {
  const [name, setName] = useLocalStorage<string | null>(localStorageKey, null)
  const [state, setState] = React.useState<{
    connector?: Connector
    data?: Data
    error?: Error
  }>({})

  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!autoConnect) return
    ;(async () => {
      const sorted = name
        ? [...connectors].sort((x) => (x.name === name ? -1 : 1))
        : connectors
      for (const connector of sorted) {
        if (!connector.isAuthorized) continue
        const isAuthorized = await connector.isAuthorized()
        if (!isAuthorized) continue

        const data = await connector.connect()
        setState((x) => ({ ...x, connector, data }))
        break
      }
    })()
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

    const onChange = (data: Data) =>
      setState((x) => ({ ...x, data: { ...x.data, ...data } }))
    const onDisconnect = () => setState({})
    const onError = (error: Error) => setState((x) => ({ ...x, error }))

    state.connector.on('change', onChange)
    state.connector.on('disconnect', onDisconnect)
    state.connector.on('error', onError)

    return () => {
      if (!state.connector) return
      state.connector.off('change', onChange)
      state.connector.off('disconnect', onDisconnect)
      state.connector.off('error', onError)
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
