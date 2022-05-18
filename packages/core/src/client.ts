import { getDefaultProvider } from 'ethers'
import { Mutate, StoreApi, default as create } from 'zustand/vanilla'
import { persist, subscribeWithSelector } from 'zustand/middleware'

import { Connector, ConnectorData, InjectedConnector } from './connectors'
import { ClientStorage, createStorage, noopStorage } from './storage'
import { warn } from './utils'
import { Provider, WebSocketProvider } from './types'

export type ClientConfig<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = {
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
  provider?: ((config: { chainId?: number }) => TProvider) | TProvider
  /**
   * Custom storage for data persistance
   * @default window.localStorage
   */
  storage?: ClientStorage
  /** WebSocket interface for connecting to network */
  webSocketProvider?:
    | ((config: { chainId?: number }) => TWebSocketProvider | undefined)
    | TWebSocketProvider
}

export type Data<TProvider extends Provider> = ConnectorData<TProvider>
export type State<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = {
  chains?: Connector['chains']
  connector?: Connector
  connectors: Connector[]
  data?: Data<TProvider>
  error?: Error
  provider: TProvider
  status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
  webSocketProvider?: TWebSocketProvider
}

const storeKey = 'store'

export class Client<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> {
  config: Partial<ClientConfig<TProvider, TWebSocketProvider>>
  storage: ClientStorage
  store: Mutate<
    StoreApi<State<TProvider, TWebSocketProvider>>,
    [
      ['zustand/subscribeWithSelector', never],
      ['zustand/persist', Partial<State<TProvider, TWebSocketProvider>>],
    ]
  >

  #lastUsedConnector?: string | null

  constructor(config: ClientConfig<TProvider, TWebSocketProvider> = {}) {
    // Set default values for config
    const autoConnect = config.autoConnect ?? false
    const connectors = config.connectors ?? [new InjectedConnector()]
    const provider =
      config.provider ??
      ((config) => {
        try {
          return <TProvider>getDefaultProvider(config.chainId)
        } catch {
          return <TProvider>getDefaultProvider()
        }
      })
    const storage =
      config.storage ??
      createStorage({
        storage:
          typeof window !== 'undefined' ? window.localStorage : noopStorage,
      })
    const webSocketProvider = config.webSocketProvider

    // Check status for autoConnect flag
    let status: State<TProvider, TWebSocketProvider>['status'] = 'disconnected'
    let chainId: number | undefined
    if (autoConnect) {
      try {
        const rawState = storage.getItem(storeKey, '')
        const data: Data<TProvider> | undefined = JSON.parse(rawState || '{}')
          ?.state?.data
        // If account exists in localStorage, set status to reconnecting
        status = data?.account ? 'reconnecting' : 'connecting'
        chainId = data?.chain?.id
        // eslint-disable-next-line no-empty
      } catch (_error) {}
    }

    // Evaluate initial store values
    const connectors_ =
      typeof connectors === 'function' ? connectors({ chainId }) : connectors
    const provider_ =
      typeof provider === 'function' ? provider({ chainId }) : provider
    const webSocketProvider_ =
      typeof webSocketProvider === 'function'
        ? webSocketProvider({ chainId })
        : webSocketProvider

    // Create store
    this.store = create(
      subscribeWithSelector(
        persist<
          State<TProvider, TWebSocketProvider>,
          [['zustand/subscribeWithSelector', never]]
        >(
          () => ({
            connectors: connectors_,
            provider: provider_,
            status,
            webSocketProvider: webSocketProvider_,
          }),
          {
            name: storeKey,
            getStorage: () => storage,
            partialize: (state) => ({
              ...(autoConnect && {
                data: {
                  account: state?.data?.account,
                  chain: state?.data?.chain,
                },
              }),
              chains: state?.chains,
            }),
            version: 1,
          },
        ),
      ),
    )

    this.config = {
      autoConnect,
      connectors,
      provider,
      storage,
      webSocketProvider,
    }
    this.storage = storage
    this.#lastUsedConnector = storage?.getItem('wallet')
    this.#addEffects()
  }

  get chains() {
    return this.store.getState().chains
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

  setState(
    updater:
      | State<TProvider, TWebSocketProvider>
      | ((
          state: State<TProvider, TWebSocketProvider>,
        ) => State<TProvider, TWebSocketProvider>),
  ) {
    const newState =
      typeof updater === 'function' ? updater(this.store.getState()) : updater
    this.store.setState(newState, true)
  }

  clearState() {
    this.setState((x) => ({
      ...x,
      chains: undefined,
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
      this.setState((x) => ({
        ...x,
        connector,
        chains: connector?.chains,
        data,
        status: 'connected',
      }))
      connected = true
      break
    }

    // If connecting didn't succeed, set to disconnected
    if (!connected)
      this.setState((x) => ({
        ...x,
        data: undefined,
        status: 'disconnected',
      }))

    return this.data
  }

  setLastUsedConnector(lastUsedConnector: string | null = null) {
    this.storage?.setItem('wallet', lastUsedConnector)
  }

  #addEffects() {
    const onChange = (data: Data<TProvider>) => {
      this.setState((x) => ({
        ...x,
        data: { ...x.data, ...data },
      }))
    }
    const onDisconnect = () => {
      this.clearState()
    }
    const onError = (error: Error) => {
      this.setState((x) => ({ ...x, error }))
    }

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

    const { provider, webSocketProvider } = this.config
    const subscribeProvider = typeof provider === 'function'
    const subscribeWebSocketProvider = typeof webSocketProvider === 'function'

    if (subscribeProvider || subscribeWebSocketProvider)
      this.store.subscribe(
        ({ data }) => data?.chain?.id,
        (chainId) => {
          this.setState((x) => ({
            ...x,
            provider: subscribeProvider ? provider({ chainId }) : x.provider,
            webSocketProvider: subscribeWebSocketProvider
              ? webSocketProvider({ chainId })
              : x.webSocketProvider,
          }))
        },
      )
  }
}

export let client: Client<Provider, WebSocketProvider>

export function createClient<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(config?: ClientConfig<TProvider, TWebSocketProvider>) {
  const client_ = new Client<TProvider, TWebSocketProvider>(config)
  client = client_ as unknown as Client<Provider, WebSocketProvider>
  return client_
}

export function getClient<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>() {
  if (!client) {
    warn('No client defined. Falling back to default client.')
    return new Client<TProvider, TWebSocketProvider>()
  }
  return client as unknown as Client<TProvider, TWebSocketProvider>
}
