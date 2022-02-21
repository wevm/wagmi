import {
  BaseProvider,
  WebSocketProvider,
  getDefaultProvider,
} from '@ethersproject/providers'
import { EventEmitter } from 'eventemitter3'

import {
  InjectedConnector,
  Connector as TConnector,
  Data as TData,
} from './connectors'
import { WagmiStorage, createStorage, noopStorage } from './utils/storage'

export type WagmiClientConfig = {
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
  connectors: Connector[] | ((config: { chainId?: number }) => Connector[])
  /**
   * Interface for connecting to network
   * @default getDefaultProvider()
   */
  provider?:
    | BaseProvider
    | ((config: { chainId?: number; connector?: Connector }) => BaseProvider)
  /**
   * Custom storage for data persistance
   * @default window.localStorage
   */
  storage?: WagmiStorage
  /** WebSocket interface for connecting to network */
  webSocketProvider?:
    | WebSocketProvider
    | ((config: {
        chainId?: number
        connector?: Connector
      }) => WebSocketProvider | undefined)
}

export type Connector = TConnector
export type Data = TData<BaseProvider>
export type State = {
  connector?: Connector
  data?: Data
  error?: Error
}

export type AutoConnectionChangedArgs = {
  connecting: boolean
  data: Data | undefined
  connector: Connector | undefined
}

export interface ClientEvents {
  autoConnectionChanged(data: AutoConnectionChangedArgs): void
  stateChanged(state: State): void
}

export class WagmiClient extends EventEmitter<ClientEvents> {
  config: Partial<WagmiClientConfig>
  connectors?: Connector[]
  provider?: BaseProvider
  webSocketProvider?: WebSocketProvider

  #state: State
  #storage?: WagmiStorage
  #lastUsedConnector?: string | null

  constructor({
    connectors = [new InjectedConnector()],
    provider = getDefaultProvider(),
    storage = createStorage({
      storage:
        typeof window !== 'undefined' ? window.localStorage : noopStorage,
    }),
    webSocketProvider,
  }: WagmiClientConfig) {
    super()

    this.config = {
      connectors,
      provider,
      webSocketProvider,
    }
    this.#state = {}

    this.setStorage(storage)
    this.setConnectors(connectors)
    this.setProvider(provider)
    this.setWebSocketProvider(webSocketProvider)
    this.setLastUsedConnector()
  }

  set connector(connector: State['connector']) {
    const onChange = (data: Data) =>
      this.setState((x) => ({ ...x, data: { ...x.data, ...data } }))
    const onDisconnect = () => {
      this.setState({})
    }
    const onError = (error: Error) => this.setState((x) => ({ ...x, error }))

    this.#state.connector?.off('change', onChange)
    this.#state.connector?.off('disconnect', onDisconnect)
    this.#state.connector?.off('error', onError)

    this.#state.connector = connector

    this.#state.connector?.on('change', onChange)
    this.#state.connector?.on('disconnect', onDisconnect)
    this.#state.connector?.on('error', onError)

    const { provider, webSocketProvider } = this.config
    this.setProvider(provider)
    this.setWebSocketProvider(webSocketProvider)
  }
  get connector() {
    return this.#state.connector
  }

  set data(data: State['data']) {
    const prevData = this.#state.data
    this.#state.data = data

    if (prevData?.chain?.id !== data?.chain?.id) {
      const { connectors, provider, webSocketProvider } = this.config
      if (connectors) this.setConnectors(connectors)
      this.setProvider(provider)
      this.setWebSocketProvider(webSocketProvider)
    }
  }
  get data() {
    return this.#state.data
  }

  set error(error: State['error']) {
    this.#state.error = error
  }
  get error() {
    return this.#state.error
  }

  setState(updater: State | (({ error, data, connector }: State) => State)) {
    const newState =
      typeof updater === 'function' ? updater(this.#state) : updater
    this.connector = newState.connector
    this.data = newState.data
    this.error = newState.error
    this.emit('stateChanged', newState)
  }

  async autoConnect() {
    if (this.connectors) {
      const sorted = this.#lastUsedConnector
        ? [...this.connectors].sort((x) =>
            x.name === this.#lastUsedConnector ? -1 : 1,
          )
        : this.connectors

      this.emit('autoConnectionChanged', {
        connecting: true,
        data: this.data,
        connector: this.connector,
      })

      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue
        const isAuthorized = await connector.isAuthorized()
        if (!isAuthorized) continue

        const data = await connector.connect()
        this.setState((x) => ({ ...x, data, connector }))
        break
      }
      this.emit('autoConnectionChanged', {
        connecting: false,
        data: this.data,
        connector: this.connector,
      })
    }
    return
  }

  setLastUsedConnector(lastUsedConnector: string | null = null) {
    this.#lastUsedConnector = this.#storage?.getItem(
      'wallet',
      lastUsedConnector,
    )
    if (lastUsedConnector) {
      this.#storage?.setItem('wallet', lastUsedConnector)
    }
  }

  async disconnect() {
    if (this.connector) {
      await this.connector.disconnect()
    }
    this.setState({})
  }

  private setConnectors(connectors: WagmiClientConfig['connectors']) {
    if (typeof connectors !== 'function') {
      this.connectors = connectors
      return
    }
    this.connectors = connectors({ chainId: this.data?.chain?.id })
  }

  private setProvider(provider: WagmiClientConfig['provider']) {
    if (typeof provider !== 'function') {
      this.provider = provider
      return
    }
    this.provider = provider({
      chainId: this.data?.chain?.id,
      connector: this.connector,
    })
  }

  private setStorage(storage: WagmiClientConfig['storage']) {
    if (!storage) return
    this.#storage = storage
  }

  private setWebSocketProvider(
    webSocketProvider: WagmiClientConfig['webSocketProvider'],
  ) {
    if (!webSocketProvider) return
    if (typeof webSocketProvider !== 'function') {
      this.webSocketProvider = webSocketProvider
      return
    }
    this.webSocketProvider = webSocketProvider({
      chainId: this.data?.chain?.id,
      connector: this.connector,
    })
  }
}

export let wagmiClient = new WagmiClient({
  connectors: [],
  provider: getDefaultProvider(),
})

export function createWagmiClient(config: WagmiClientConfig) {
  const client = new WagmiClient(config)
  wagmiClient = client
  return client
}
