import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { Mutate, StoreApi } from 'zustand/vanilla'
import { createStore } from 'zustand/vanilla'

import type { Connector, ConnectorData } from './connectors'
import { InjectedConnector } from './connectors'
import type { ClientStorage } from './storage'
import { createStorage, noopStorage } from './storage'
import type { PublicClient, WebSocketPublicClient } from './types'

export type ClientConfig<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
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
  publicClient:
    | ((config: { chainId?: number }) => TPublicClient)
    | TPublicClient
  /**
   * Custom storage for data persistance
   * @default window.localStorage
   */
  storage?: ClientStorage
  /** WebSocket interface for connecting to network */
  webSocketPublicClient?:
    | ((config: { chainId?: number }) => TWebSocketPublicClient | undefined)
    | TWebSocketPublicClient
}

export type Data = ConnectorData
export type State<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = {
  chains?: Connector['chains']
  connector?: Connector
  connectors: Connector[]
  data?: Data
  error?: Error
  publicClient: TPublicClient
  status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
  webSocketPublicClient?: TWebSocketPublicClient
}

const storeKey = 'store'

export class Client<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> {
  config: ClientConfig<TPublicClient, TWebSocketPublicClient>
  publicClients = new Map<number, TPublicClient | undefined>()
  storage: ClientStorage
  store: Mutate<
    StoreApi<State<TPublicClient, TWebSocketPublicClient>>,
    [
      ['zustand/subscribeWithSelector', never],
      [
        'zustand/persist',
        Partial<State<TPublicClient, TWebSocketPublicClient>>,
      ],
    ]
  >
  webSocketPublicClients = new Map<number, TWebSocketPublicClient | undefined>()

  #isAutoConnecting?: boolean
  #lastUsedConnector?: string | null

  constructor({
    autoConnect = false,
    connectors = [new InjectedConnector()],
    publicClient,
    storage = createStorage({
      storage:
        typeof window !== 'undefined' ? window.localStorage : noopStorage,
    }),
    logger = {
      warn: console.warn,
    },
    webSocketPublicClient,
  }: ClientConfig<TPublicClient, TWebSocketPublicClient>) {
    this.config = {
      autoConnect,
      connectors,
      logger,
      publicClient,
      storage,
      webSocketPublicClient,
    }

    // Check status for autoConnect flag
    let status: State['status'] = 'disconnected'
    let chainId: number | undefined
    if (autoConnect) {
      try {
        const rawState = storage.getItem<{
          state: State<TPublicClient, TWebSocketPublicClient>
        }>(storeKey)
        const data: Data | undefined = rawState?.state?.data
        // If account exists in localStorage, set status to reconnecting
        status = data?.account ? 'reconnecting' : 'connecting'
        chainId = data?.chain?.id
        // eslint-disable-next-line no-empty
      } catch (_error) {}
    }

    const connectors_ =
      typeof connectors === 'function' ? connectors() : connectors

    // Setup storage for connectors.
    // REFACTOR: wagmi v1 (w/ functional connectors) should just curry
    // the storage into the connectors.
    connectors_.forEach((connector) => connector.setStorage(storage))

    // Create store
    this.store = createStore<
      State<TPublicClient, TWebSocketPublicClient>,
      [
        ['zustand/subscribeWithSelector', never],
        [
          'zustand/persist',
          Partial<State<TPublicClient, TWebSocketPublicClient>>,
        ],
      ]
    >(
      subscribeWithSelector(
        persist(
          () =>
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            <State<TPublicClient, TWebSocketPublicClient>>{
              connectors: connectors_,
              publicClient: this.getPublicClient({ chainId }),
              status,
              webSocketPublicClient: this.getWebSocketPublicClient({ chainId }),
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
  get publicClient() {
    return this.store.getState().publicClient
  }
  get status() {
    return this.store.getState().status
  }
  get subscribe() {
    return this.store.subscribe
  }
  get webSocketPublicClient() {
    return this.store.getState().webSocketPublicClient
  }

  setState(
    updater:
      | State<TPublicClient, TWebSocketPublicClient>
      | ((
          state: State<TPublicClient, TWebSocketPublicClient>,
        ) => State<TPublicClient, TWebSocketPublicClient>),
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

  getPublicClient({ chainId }: { bust?: boolean; chainId?: number } = {}) {
    let publicClient_ = this.publicClients.get(-1)
    if (publicClient_ && publicClient_?.chain.id === chainId)
      return publicClient_

    publicClient_ = this.publicClients.get(chainId ?? -1)
    if (publicClient_) return publicClient_

    const { publicClient } = this.config
    publicClient_ =
      typeof publicClient === 'function'
        ? publicClient({ chainId })
        : publicClient
    this.publicClients.set(chainId ?? -1, publicClient_)

    return publicClient_
  }

  getWebSocketPublicClient({ chainId }: { chainId?: number } = {}) {
    let webSocketPublicClient_ = this.webSocketPublicClients.get(-1)
    if (webSocketPublicClient_ && webSocketPublicClient_?.chain.id === chainId)
      return webSocketPublicClient_

    webSocketPublicClient_ = this.webSocketPublicClients.get(chainId ?? -1)
    if (webSocketPublicClient_) return webSocketPublicClient_

    const { webSocketPublicClient } = this.config
    webSocketPublicClient_ =
      typeof webSocketPublicClient === 'function'
        ? webSocketPublicClient({ chainId })
        : webSocketPublicClient
    if (webSocketPublicClient_)
      this.webSocketPublicClients.set(chainId ?? -1, webSocketPublicClient_)

    return webSocketPublicClient_
  }

  setLastUsedConnector(lastUsedConnector: string | null = null) {
    this.storage?.setItem('wallet', lastUsedConnector)
  }

  #addEffects() {
    const onChange = (data: Data) => {
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

    const { publicClient, webSocketPublicClient } = this.config
    const subscribePublicClient = typeof publicClient === 'function'
    const subscribeWebSocketPublicClient =
      typeof webSocketPublicClient === 'function'

    if (subscribePublicClient || subscribeWebSocketPublicClient)
      this.store.subscribe(
        ({ data }) => data?.chain?.id,
        (chainId) => {
          this.setState((x) => ({
            ...x,
            publicClient: this.getPublicClient({ chainId }),
            webSocketPublicClient: this.getWebSocketPublicClient({
              chainId,
            }),
          }))
        },
      )
  }
}

export let client: Client<PublicClient, WebSocketPublicClient>

export function createClient<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>(config: ClientConfig<TPublicClient, TWebSocketPublicClient>) {
  const client_ = new Client<TPublicClient, TWebSocketPublicClient>(config)
  client = client_ as unknown as Client<PublicClient, WebSocketPublicClient>
  return client_
}

export function getClient<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>() {
  if (!client) {
    throw new Error(
      'No wagmi client found. Ensure you have set up a client: https://wagmi.sh/react/client',
    )
  }
  return client as unknown as Client<TPublicClient, TWebSocketPublicClient>
}
