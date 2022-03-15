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

const defaultConfig: Required<
  Pick<ClientConfig, 'connectors' | 'provider' | 'storage'>
> = {
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
  store: Mutate<
    StoreApi<State>,
    [
      ['zustand/subscribeWithSelector', never],
      ['zustand/persist', Partial<State>],
    ]
  >

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

    let status: State['status'] = 'disconnected'
    if (autoConnect) {
      try {
        const rawState = storage.getItem('state', '')
        const data = JSON.parse(rawState || '{}')?.state?.data
        // If account exists in localStorage, set status to reconnecting
        status = data?.account ? 'reconnecting' : 'connecting'
        // eslint-disable-next-line no-empty
      } catch (_error) {}
    }

    this.store = create<
      State,
      SetState<State>,
      GetState<State>,
      Client['store']
    >(
      subscribeWithSelector(
        persist<State>(
          (_set, _get) => ({
            connectors:
              typeof connectors === 'function' ? connectors({}) : connectors,
            provider: typeof provider === 'function' ? provider({}) : provider,
            status,
            webSocketProvider:
              typeof webSocketProvider === 'function'
                ? webSocketProvider({})
                : webSocketProvider,
          }),
          {
            name: 'state',
            getStorage: () => storage,
            partialize: (state) => ({
              data: {
                account: state?.data?.account,
                chain: state?.data?.chain,
              },
            }),
          },
        ),
      ),
    )

    this.storage = storage
    this.#lastUsedConnector = storage?.getItem('wallet')
    this.#addEffects()
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
  get status() {
    return this.store.getState().status
  }
  get subscribe() {
    return this.store.subscribe
  }
  get webSocketProvider() {
    return this.store.getState().webSocketProvider
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
    if (!this.connectors.length) return

    // Try last used connector first
    const sorted = this.#lastUsedConnector
      ? [...this.connectors].sort((x) =>
          x.id === this.#lastUsedConnector ? -1 : 1,
        )
      : this.connectors

    let connected = false
    for (const connector of sorted) {
      if (!connector.ready || !connector.isAuthorized) continue
      const isAuthorized = await connector.isAuthorized()
      if (!isAuthorized) continue

      const data = await connector.connect()
      this.setState((x) => ({ ...x, connector, data, status: 'connected' }))
      connected = true
      break
    }

    // If connecting didn't succeed, set to disconnected
    if (!connected) this.setState((x) => ({ ...x, status: 'disconnected' }))

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
    const subscribeWebSocketProvider = typeof webSocketProvider === 'function'

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
