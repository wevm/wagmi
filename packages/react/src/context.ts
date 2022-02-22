import * as React from 'react'
import {
  BaseProvider,
  Web3Provider,
  WebSocketProvider,
  getDefaultProvider,
} from '@ethersproject/providers'
import { Connector, ConnectorData, InjectedConnector } from '@wagmi/core'

import { useLocalStorage } from './hooks'

type State = {
  cacheBuster: number
  connecting?: boolean
  connector?: Connector
  data?: ConnectorData<Web3Provider>
  error?: Error
}

type ContextValue = {
  state: {
    /** Flag for triggering refetch */
    cacheBuster: State['cacheBuster']
    /** Flag for when connection is in progress */
    connecting?: State['connecting']
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
  /**
   * Key for saving connector preference to browser
   * @default 'wagmi.wallet'
   */
  connectorStorageKey?: string
  /**
   * Connectors used for linking accounts
   * @default [new InjectedConnector()]
   */
  connectors?: Connector[] | ((config: { chainId?: number }) => Connector[])
  /**
   * Interface for connecting to network
   * @default getDefaultProvider()
   */
  provider?:
    | BaseProvider
    | ((config: { chainId?: number; connector?: Connector }) => BaseProvider)
  /** WebSocket interface for connecting to network */
  webSocketProvider?:
    | WebSocketProvider
    | ((config: {
        chainId?: number
        connector?: Connector
      }) => WebSocketProvider | undefined)
}

export const Provider = ({
  autoConnect = false,
  children,
  connectors: connectors_ = [new InjectedConnector()],
  connectorStorageKey = 'wagmi.wallet',
  provider: provider_ = getDefaultProvider(),
  webSocketProvider: webSocketProvider_,
}: React.PropsWithChildren<Props>) => {
  const [lastUsedConnector, setLastUsedConnector] = useLocalStorage<
    string | null
  >(connectorStorageKey)
  const [state, setState] = React.useState<State>({
    cacheBuster: 1,
    connecting: autoConnect,
  })

  const connectors = React.useMemo(() => {
    if (typeof connectors_ !== 'function') return connectors_
    return connectors_({ chainId: state.data?.chain?.id })
  }, [connectors_, state.data?.chain?.id])

  const provider = React.useMemo(() => {
    if (typeof provider_ !== 'function') return provider_
    return provider_({
      chainId: state.data?.chain?.id,
      connector: state.connector,
    })
  }, [provider_, state.data?.chain?.id, state.connector])

  const webSocketProvider = React.useMemo(() => {
    if (!webSocketProvider_) return undefined
    if (typeof webSocketProvider_ !== 'function') return webSocketProvider_
    return webSocketProvider_({
      chainId: state.data?.chain?.id,
      connector: state.connector,
    })
  }, [webSocketProvider_, state.data?.chain?.id, state.connector])

  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!autoConnect) return
    ;(async () => {
      setState((x) => ({ ...x, connecting: true }))
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
      setState((x) => ({ ...x, connecting: false }))
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

    const onChange = (data: ConnectorData) =>
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
      connecting: state.connecting,
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
