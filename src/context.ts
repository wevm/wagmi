import * as React from 'react'
import { Provider as EthersProvider } from '@ethersproject/abstract-provider'

import { Connector, Data, InjectedConnector } from './connectors'
import { useLocalStorage } from './hooks'

type State = {
  connector?: Connector
  data?: Data
  error?: Error
}

type ContextValue = [
  {
    /** Active connector */
    connector?: State['connector']
    /** Connectors used for linking accounts */
    connectors: Connector[]
    /** Active data */
    data?: State['data']
    /** Interface for connecting to network */
    provider: EthersProvider
  },
  React.Dispatch<React.SetStateAction<State>>,
  (newValue: string | null) => void,
]

export const Context = React.createContext<ContextValue | null>(null)

type Props = {
  /** Enables reconnecting to last used connector on mount */
  autoConnect?: boolean
  /** Key for saving connector preference to browser */
  connectorStorageKey?: string
  /** Connectors used for linking accounts */
  connectors?: Connector[]
  /** Interface for connecting to network */
  provider: EthersProvider | ((connector?: Connector) => EthersProvider)
}

export const Provider = ({
  autoConnect,
  children,
  connectors = [new InjectedConnector()],
  connectorStorageKey = 'wagmiWallet',
  provider: _provider,
}: React.PropsWithChildren<Props>) => {
  const [lastUsedConnector, setLastUsedConnector] = useLocalStorage<
    string | null
  >(connectorStorageKey, null)
  const [state, setState] = React.useState<{
    connector?: Connector
    data?: Data
    error?: Error
  }>({})

  const provider = React.useMemo(() => {
    if (typeof _provider === 'function') return _provider(state.connector)
    return _provider
  }, [_provider, state.connector])

  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!autoConnect) return
    ;(async () => {
      const sorted = lastUsedConnector
        ? [...connectors].sort((x) => (x.name === lastUsedConnector ? -1 : 1))
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
      provider,
    },
    setState,
    setLastUsedConnector,
  ] as ContextValue

  return React.createElement(Context.Provider, { value }, children)
}
