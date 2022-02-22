import {
  BaseProvider,
  WebSocketProvider,
  getDefaultProvider,
} from '@ethersproject/providers'
import create from 'zustand/vanilla'
import { subscribeWithSelector } from 'zustand/middleware'

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
export type Store = {
  connecting?: boolean
  connector?: Connector
  data?: Data
  error?: Error
  connectors?: Connector[]
  provider?: BaseProvider
  webSocketProvider?: WebSocketProvider
}

export type AutoConnectionChangedArgs = {
  connecting: boolean
  data: Data | undefined
  connector: Connector | undefined
}

export class WagmiClient {
  config: Partial<WagmiClientConfig>
  store

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
    this.config = {
      connectors,
      provider,
      webSocketProvider,
    }
    this.store = create(subscribeWithSelector<Store>(() => ({})))

    this.setStorage(storage)
    this.setConnectors(connectors)
    this.setProvider(provider)
    this.setWebSocketProvider(webSocketProvider)
    this.setLastUsedConnector()

    this.addEffects()
  }

  get connecting() {
    return this.store.getState().connecting
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

  setState(updater: Store | ((store: Store) => Store)) {
    const newState =
      typeof updater === 'function' ? updater(this.store.getState()) : updater
    this.store.setState(newState, true)
  }

  async autoConnect() {
    if (this.connectors) {
      const sorted = this.#lastUsedConnector
        ? [...this.connectors].sort((x) =>
            x.name === this.#lastUsedConnector ? -1 : 1,
          )
        : this.connectors

      this.setState((x) => ({
        ...x,
        connecting: true,
      }))
      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue
        const isAuthorized = await connector.isAuthorized()
        if (!isAuthorized) continue

        const data = await connector.connect()
        this.setState((x) => ({ ...x, data, connector }))
        break
      }
      this.setState((x) => ({
        ...x,
        connecting: false,
      }))
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

  async destroy() {
    if (this.connector) {
      await this.connector.disconnect()
    }
    this.setState({})
    this.store.destroy()
  }

  private setConnectors(connectors_: WagmiClientConfig['connectors']) {
    let connectors: Connector[] | undefined
    if (typeof connectors_ === 'function') {
      connectors = connectors_({ chainId: this.data?.chain?.id })

      // Subscribe to changes that should update `connectors`
      this.store.subscribe(
        (store) => store.data?.chain?.id,
        () => {
          this.setState((x) => ({
            ...x,
            connectors: connectors_({ chainId: this.data?.chain?.id }),
          }))
        },
      )
    } else {
      connectors = connectors_
    }

    this.setState((x) => ({ ...x, connectors }))
  }

  private setProvider(provider_: WagmiClientConfig['provider']) {
    let provider: BaseProvider | undefined
    if (typeof provider_ === 'function') {
      provider = provider_({
        chainId: this.data?.chain?.id,
        connector: this.connector,
      })

      // Subscribe to changes that should update `provider`
      this.store.subscribe(
        (store) => [store.data?.chain?.id, store.connector],
        () => {
          this.setState((x) => ({
            ...x,
            provider: provider_({
              chainId: this.data?.chain?.id,
              connector: this.connector,
            }),
          }))
        },
        {
          equalityFn: ([chainId], [newChainId]) => chainId === newChainId,
        },
      )
    } else {
      provider = provider_
    }

    this.setState((x) => ({ ...x, provider }))
  }

  private setStorage(storage: WagmiClientConfig['storage']) {
    if (!storage) return
    this.#storage = storage
  }

  private setWebSocketProvider(
    webSocketProvider_: WagmiClientConfig['webSocketProvider'],
  ) {
    let webSocketProvider: WebSocketProvider | undefined
    if (webSocketProvider_ && typeof webSocketProvider === 'function') {
      webSocketProvider = (
        webSocketProvider_ as (config: {
          chainId?: number
          connector?: Connector
        }) => WebSocketProvider | undefined
      )({
        chainId: this.data?.chain?.id,
        connector: this.connector,
      })

      // Subscribe to changes that should update `webSocketProvider`
      this.store.subscribe(
        (store) => [store.data?.chain?.id, store.connector],
        () => {
          this.setState((x) => ({
            ...x,
            provider: (
              webSocketProvider_ as (config: {
                chainId?: number
                connector?: Connector
              }) => WebSocketProvider | undefined
            )({
              chainId: this.data?.chain?.id,
              connector: this.connector,
            }),
          }))
        },
      )
    } else {
      webSocketProvider = webSocketProvider_ as WebSocketProvider
    }

    this.setState((x) => ({ ...x, webSocketProvider }))
  }

  private addEffects() {
    const onChange = (data: Data) =>
      this.setState((x) => ({
        ...x,
        data: { ...x.data, ...data },
      }))
    const onDisconnect = () => this.setState({})
    const onError = (error: Error) => this.setState((x) => ({ ...x, error }))

    this.store.subscribe(
      (store) => store.connector,
      (connector, prevConnector) => {
        prevConnector?.off('change', onChange)
        prevConnector?.off('disconnect', onDisconnect)
        prevConnector?.off('error', onError)

        if (!connector) return
        connector.on('change', onChange)
        connector.on('disconnect', onDisconnect)
        connector.on('error', onError)
      },
    )
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
