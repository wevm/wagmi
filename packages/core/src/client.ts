import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { Mutate, StoreApi } from 'zustand/vanilla'
import { createStore } from 'zustand/vanilla'

import type { Connector, ConnectorData } from './connectors'
import { InjectedConnector } from './connectors'
import type { ClientStorage } from './storage'
import { createStorage, noopStorage } from './storage'
import type { Provider, WebSocketProvider } from './types'

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
  connectors?: (() => Connector[]) | Connector[]
  /** Custom logger */
  logger?: {
    warn: typeof console.warn | null
  }
  /** Interface for connecting to network */
  provider: ((config: { chainId?: number }) => TProvider) | TProvider
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
  TProvider extends Provider = Provider,
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
  config: ClientConfig<TProvider, TWebSocketProvider>
  providers = new Map<number, TProvider | undefined>()
  storage: ClientStorage
  store: Mutate<
    StoreApi<State<TProvider, TWebSocketProvider>>,
    [
      ['zustand/subscribeWithSelector', never],
      ['zustand/persist', Partial<State<TProvider, TWebSocketProvider>>],
    ]
  >
  webSocketProviders = new Map<number, TWebSocketProvider | undefined>()

  #isAutoConnecting?: boolean
  #lastUsedConnector?: string | null

  constructor({
    autoConnect = false,
    connectors = [new InjectedConnector()],
    provider,
    storage = createStorage({
      storage:
        typeof window !== 'undefined' ? window.localStorage : noopStorage,
    }),
    logger = {
      warn: console.warn,
    },
    webSocketProvider,
  }: ClientConfig<TProvider, TWebSocketProvider>) {
    this.config = {
      autoConnect,
      connectors,
      logger,
      provider,
      storage,
      webSocketProvider,
    }

    // Check status for autoConnect flag
    let status: State['status'] = 'disconnected'
    let chainId: number | undefined
    if (autoConnect) {
      try {
        const rawState = storage.getItem<{
          state: State<TProvider, TWebSocketProvider>
        }>(storeKey)
        const data: Data<TProvider> | undefined = rawState?.state?.data
        // If account exists in localStorage, set status to reconnecting
        status = data?.account ? 'reconnecting' : 'connecting'
        chainId = data?.chain?.id
        // eslint-disable-next-line no-empty
      } catch (_error) {}
    }

    // Create store
    this.store = createStore<
      State<TProvider, TWebSocketProvider>,
      [
        ['zustand/subscribeWithSelector', never],
        ['zustand/persist', Partial<State<TProvider, TWebSocketProvider>>],
      ]
    >(
      subscribeWithSelector(
        persist(
          () =>
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            <State<TProvider, TWebSocketProvider>>{
              connectors:
                typeof connectors === 'function' ? connectors() : connectors,
              provider: this.getProvider({ chainId }),
              status,
              webSocketProvider: this.getWebSocketProvider({ chainId }),
            },
          {
            name: storeKey,
            storage,
            partialize: (state) => ({
              ...(autoConnect && {
                data: {
                  account: state?.data?.account,
                  chain: state?.data?.chain,
                },
              }),
              chains: state?.chains,
            }),
            version: 2,
          },
        ),
      ),
    )

    this.storage = storage
    this.#lastUsedConnector = storage?.getItem('wallet')
    this.#addEffects()

    if (autoConnect && typeof window !== 'undefined')
      setTimeout(async () => await this.autoConnect(), 0)
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
  get lastUsedChainId() {
    return this.data?.chain?.id
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
    this.#isAutoConnecting = false
    this.clearState()
    this.store.destroy()
  }

  async autoConnect() {
    if (this.#isAutoConnecting) return
    this.#isAutoConnecting = true

    this.setState((x) => ({
      ...x,
      status: x.data?.account ? 'reconnecting' : 'connecting',
    }))

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

    this.#isAutoConnecting = false

    return this.data
  }

  getProvider({ bust, chainId }: { bust?: boolean; chainId?: number } = {}) {
    let provider_ = this.providers.get(chainId ?? -1)
    if (provider_ && !bust) return provider_

    const { provider } = this.config
    provider_ =
      typeof provider === 'function' ? provider({ chainId }) : provider
    this.providers.set(chainId ?? -1, provider_)

    return provider_
  }

  getWebSocketProvider({
    bust,
    chainId,
  }: { bust?: boolean; chainId?: number } = {}) {
    let webSocketProvider_ = this.webSocketProviders.get(chainId ?? -1)
    if (webSocketProvider_ && !bust) return webSocketProvider_

    const { webSocketProvider } = this.config
    webSocketProvider_ =
      typeof webSocketProvider === 'function'
        ? webSocketProvider({ chainId })
        : webSocketProvider
    if (webSocketProvider_)
      this.webSocketProviders.set(chainId ?? -1, webSocketProvider_)

    return webSocketProvider_
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
            provider: this.getProvider({ bust: true, chainId }),
            webSocketProvider: this.getWebSocketProvider({
              bust: true,
              chainId,
            }),
          }))
        },
      )
  }
}

export let client: Client<Provider, WebSocketProvider>

export function createClient<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(config: ClientConfig<TProvider, TWebSocketProvider>) {
  const client_ = new Client<TProvider, TWebSocketProvider>(config)
  client = client_ as unknown as Client<Provider, WebSocketProvider>
  return client_
}

export function getClient<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>() {
  if (!client) {
    throw new Error(
      'No wagmi client found. Ensure you have set up a client: https://wagmi.sh/react/client',
    )
  }
  return client as unknown as Client<TProvider, TWebSocketProvider>
}
