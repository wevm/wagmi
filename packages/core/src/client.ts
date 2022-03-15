import {
  BaseProvider,
  WebSocketProvider,
  getDefaultProvider,
} from '@ethersproject/providers'
import {
  GetState,
  Mutate,
  SetState,
  StoreApi,
  default as create,
} from 'zustand/vanilla'
import { persist, subscribeWithSelector } from 'zustand/middleware'

import { Connector, ConnectorData, InjectedConnector } from './connectors'
import { WagmiStorage, createStorage, noopStorage } from './storage'

export type ClientConfig = {
  /** Enables reconnecting to last used connector on init */
  autoConnect?: boolean
  /**
   * Connectors used for linking accounts
   * @default [new InjectedConnector()]
   */
  connectors?: ((config: { chainId?: number }) => Connector[]) | Connector[]
  /**
   * Interface for connecting to network
   * @default (config) => getDefaultProvider(config.chainId)
   */
  provider?: ((config: { chainId?: number }) => BaseProvider) | BaseProvider
  /**
   * Custom storage for data persistance
   * @default window.localStorage
   */
  storage?: WagmiStorage
  /** WebSocket interface for connecting to network */
  webSocketProvider?:
    | ((config: { chainId?: number }) => WebSocketProvider | undefined)
    | WebSocketProvider
}

const defaultConfig: ClientConfig = {
  connectors: [new InjectedConnector()],
  provider: ({ chainId }) => {
    try {
      return getDefaultProvider(chainId)
    } catch (error) {
      return getDefaultProvider()
    }
  },
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
  }),
}

type Data = ConnectorData<BaseProvider>
type State = {
  connector?: Connector
  connectors: Connector[]
  data?: Data
  error?: Error
  provider: BaseProvider
  status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
  webSocketProvider?: WebSocketProvider
}

export class Client {
  config: Partial<ClientConfig>
  storage?: WagmiStorage
  store: Mutate<StoreApi<State>, [['zustand/subscribeWithSelector', never]]>

  #lastUsedConnector?: string | null

  constructor({
    autoConnect,
    connectors = defaultConfig.connectors,
    provider = defaultConfig.provider,
    storage = defaultConfig.storage,
    webSocketProvider,
  }: ClientConfig = defaultConfig) {
    this.config = {
      autoConnect,
      connectors,
      provider,
      webSocketProvider,
    }

    const connectors_ =
      typeof connectors === 'function' ? connectors({}) : connectors
    const provider_ = typeof provider === 'function' ? provider({}) : provider
    const webSocketProvider_ =
      typeof webSocketProvider === 'function'
        ? webSocketProvider({})
        : webSocketProvider

    let status: State['status']
    if (!autoConnect) status = 'disconnected'
    else if (storage?.getItem('connected')) status = 'reconnecting'
    else status = 'connecting'

    this.store = create<
      State,
      SetState<State>,
      GetState<State>,
      Client['store']
    >(
      subscribeWithSelector<State>(
        persist<State>(
          () => ({
            connectors: connectors_,
            provider: provider_,
            status,
            webSocketProvider: webSocketProvider_,
          }),
          {
            name: 'state',
            getStorage: () => storage,
            partialize: ({ connector, data, status }) => ({
              connector: {
                chains: connector?.chains,
                id: connector?.id,
                name: connector?.name,
              },
              data: {
                account: data?.account,
                chain: data?.chain,
              },
              status,
            }),
          },
        ),
      ),
    )

    this.storage = storage
    this.#lastUsedConnector = storage?.getItem('wallet')
    this.#addEffects()
  }

  get status() {
    return this.store.getState().status
  }
  get connectors() {
    return this.store.getState().connectors
  }
  get connector() {
    return this.store.getState().connector
  }
  get data() {
    return this.store.getState().data
  }
  get error() {
    return this.store.getState().error
  }
  get provider() {
    return this.store.getState().provider
  }
  get webSocketProvider() {
    return this.store.getState().webSocketProvider
  }
  get subscribe() {
    return this.store.subscribe
  }

  setState(updater: State | ((state: State) => State)) {
    const newState =
      typeof updater === 'function' ? updater(this.store.getState()) : updater
    this.store.setState(newState, true)
  }

  clearState() {
    this.setState((x) => ({
      ...x,
      connector: undefined,
      data: undefined,
      error: undefined,
      status: 'disconnected',
    }))
  }

  async destroy() {
    if (this.connector) await this.connector.disconnect?.()
    this.clearState()
    this.store.destroy()
  }

  async autoConnect() {
    if (!this.connectors) return

    const sorted = this.#lastUsedConnector
      ? [...this.connectors].sort((x) =>
          x.id === this.#lastUsedConnector ? -1 : 1,
        )
      : this.connectors

    for (const connector of sorted) {
      if (!connector.ready || !connector.isAuthorized) continue
      const isAuthorized = await connector.isAuthorized()
      if (!isAuthorized) continue

      const data = await connector.connect()
      this.setState((x) => ({
        ...x,
        connector,
        data,
        status: data ? 'connected' : 'disconnected',
      }))
      break
    }

    return this.data
  }

  setLastUsedConnector(lastUsedConnector: string | null = null) {
    this.storage?.setItem('wallet', lastUsedConnector)
  }

  #addEffects() {
    const onChange = (data: Data) =>
      this.setState((x) => ({
        ...x,
        data: { ...x.data, ...data },
      }))
    const onDisconnect = () => this.clearState()
    const onError = (error: Error) => this.setState((x) => ({ ...x, error }))

    this.store.subscribe(
      ({ connector }) => connector,
      (connector, prevConnector) => {
        prevConnector?.off?.('change', onChange)
        prevConnector?.off?.('disconnect', onDisconnect)
        prevConnector?.off?.('error', onError)

        if (!connector) return
        connector.on?.('change', onChange)
        connector.on?.('disconnect', onDisconnect)
        connector.on?.('error', onError)
      },
    )

    const { connectors, provider, webSocketProvider } = this.config

    const subscribeConnectors = typeof connectors === 'function'
    const subscribeProvider = typeof provider === 'function'
    const subscribeWebSocketProvider =
      !(webSocketProvider instanceof WebSocketProvider) && webSocketProvider

    if (subscribeConnectors || subscribeProvider || subscribeWebSocketProvider)
      this.store.subscribe(
        ({ data }) => data?.chain?.id,
        (chainId) => {
          this.setState((x) => ({
            ...x,
            connectors: subscribeConnectors
              ? connectors({ chainId })
              : x.connectors,
            provider: subscribeProvider ? provider({ chainId }) : x.provider,
            webSocketProvider: subscribeWebSocketProvider
              ? webSocketProvider({ chainId })
              : x.webSocketProvider,
          }))
        },
      )
  }
}

export let client: Client

export function createClient(config?: ClientConfig) {
  const client_ = new Client(config)
  client = client_
  return client_
}
