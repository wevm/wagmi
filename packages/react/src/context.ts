import * as React from 'react'
import {
  BaseProvider,
  Web3Provider,
  WebSocketProvider,
  getDefaultProvider,
} from '@ethersproject/providers'
import { Connector, Data, InjectedConnector } from 'wagmi-private'

import { useLocalStorage } from './hooks'

type State = {
  cacheBuster: number
  connector?: Connector
  data?: Data<Web3Provider>
  error?: Error
}

type ContextValue = {
  state: {
    /** Flag for triggering refetch */
    cacheBuster: State['cacheBuster']
    /** Active connector */
    connector?: State['connector']
    /** Connectors used for linking accounts */
    connectors: Connector[]
    /** Active data */
    data?: State['data']
    /** Interface for connecting to network */
    provider: BaseProvider
    /** Interface for connecting to network */
    webSocketProvider?: WebSocketProvider
  }
  setState: React.Dispatch<React.SetStateAction<State>>
  setLastUsedConnector: (newValue: string | null) => void
}

export const Context = React.createContext<ContextValue | null>(null)

export type Props = {
  /** Enables reconnecting to last used connector on mount */
  autoConnect?: boolean
  /** Key for saving connector preference to browser */
  connectorStorageKey?: string
  /** Connectors used for linking accounts */
  connectors?: Connector[] | ((config: { chainId?: number }) => Connector[])
  /** Interface for connecting to network */
  provider?:
    | BaseProvider
    | ((config: { chainId?: number; connector?: Connector }) => BaseProvider)
  /** WebSocket interface for connecting to network */
  webSocketProvider?:
    | WebSocketProvider
    | ((config: {
        chainId?: number
        connector?: Connector
      }) => WebSocketProvider)
}

export const Provider = ({
  autoConnect,
  children,
  connectors: _connectors = [new InjectedConnector()],
  connectorStorageKey = 'wagmi.wallet',
  provider: _provider = getDefaultProvider(),
  webSocketProvider: _webSocketProvider,
}: React.PropsWithChildren<Props>) => {
  const [lastUsedConnector, setLastUsedConnector] = useLocalStorage<
    string | null
  >(connectorStorageKey)
  const [state, setState] = React.useState<State>({
    cacheBuster: 1,
  })

  const connectors = React.useMemo(() => {
    if (typeof _connectors !== 'function') return _connectors
    return _connectors({ chainId: state.data?.chainId })
  }, [_connectors, state.data?.chainId])

  const provider = React.useMemo(() => {
    if (typeof _provider !== 'function') return _provider
    return _provider({
      chainId: state.data?.chainId,
      connector: state.connector,
    })
  }, [_provider, state.data?.chainId, state.connector])

  const webSocketProvider = React.useMemo(() => {
    if (!_webSocketProvider) return undefined
    if (typeof _webSocketProvider !== 'function') return _webSocketProvider
    return _webSocketProvider({
      chainId: state.data?.chainId,
      connector: state.connector,
    })
  }, [_webSocketProvider, state.data?.chainId, state.connector])

  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!autoConnect) return
    ;(async () => {
      const sorted = lastUsedConnector
        ? [...connectors].sort((x) => (x.name === lastUsedConnector ? -1 : 1))
        : connectors
      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue
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
      setState((x) => ({
        ...x,
        cacheBuster: x.cacheBuster + 1,
        data: { ...x.data, ...data },
      }))
    const onDisconnect = () => setState({ cacheBuster: 1 })
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

  const value = {
    state: {
      cacheBuster: state.cacheBuster,
      connectors,
      connector: state.connector,
      data: state.data,
      provider,
      webSocketProvider,
    },
    setState,
    setLastUsedConnector,
  }

  return React.createElement(Context.Provider, { value }, children)
}

export const useContext = () => {
  const context = React.useContext(Context)
  if (!context) throw Error('Must be used within Provider')
  return context
}
