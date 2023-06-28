import {
  type Address,
  type Chain,
  type Client,
  type Transport,
  createClient,
} from 'viem'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import { type ConnectorEventMap, type CreateConnectorFn } from './connector.js'
import { Emitter, type EventData, createEmitter } from './emitter.js'
import { ChainNotConfiguredError } from './errors/config.js'
import { type Storage, createStorage, noopStorage } from './storage.js'
import type { Evaluate, OneOf } from './types/utils.js'
import { uid } from './utils/uid.js'

export type CreateConfigParameters<
  chains extends readonly [Chain, ...Chain[]],
> = Evaluate<
  {
    chains: chains
    connectors?: CreateConnectorFn[]
    reconnectOnMount?: boolean | undefined
    storage?: Storage | null | undefined
    syncConnectedChain?: boolean | undefined
  } & OneOf<
    | {
        pollingInterval?: number
        transports: Record<chains[number]['id'], Transport>
      }
    | {
        client: (parameters: {
          chain: chains[number]
        }) => Client<Transport>
      }
  > &
    OneOf<
      | {
          /** @deprecated Use `reconnectOnMount` instead */
          autoConnect?: boolean | undefined
        }
      | { reconnectOnMount?: boolean | undefined }
    >
>

export type Config<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
> = {
  readonly chains: chains
  readonly connectors: readonly Connector[]
  readonly state: State<chains>
  readonly storage: Storage | null

  getClient(parameters?: { chainId?: number | undefined }): Client
  setState<chains_ extends readonly [Chain, ...Chain[]] = chains>(
    value: State<chains_> | ((state: State<chains_>) => State<chains_>),
  ): void
  subscribe<state>(
    selector: (state: State<chains>) => state,
    listener: (selectedState: state, previousSelectedState: state) => void,
    options?: {
      equalityFn?: (a: state, b: state) => boolean
      fireImmediately?: boolean
    },
  ): () => void

  _internal: {
    readonly reconnectOnMount: boolean
    readonly syncConnectedChain: boolean

    change(data: EventData<ConnectorEventMap, 'change'>): void
    connect(data: EventData<ConnectorEventMap, 'connect'>): void
    disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void
    setup(connectorFn: CreateConnectorFn): Connector
  }
}

export type State<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
> = {
  chainId: chains[number]['id']
  connections: Map<string, Connection>
  current: string | undefined
  status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
}
export type PartializedState = Evaluate<
  Partial<Pick<State, 'chainId' | 'connections' | 'current' | 'status'>>
>
export type Connection = {
  accounts: readonly Address[]
  chainId: number
  connector: Connector
}
export type Connector = ReturnType<CreateConnectorFn> & {
  emitter: Emitter<ConnectorEventMap>
  uid: string
}

export function createConfig<
  const chains extends readonly [Chain, ...Chain[]],
>({
  autoConnect,
  chains,
  reconnectOnMount = autoConnect ?? false,
  storage = createStorage({
    storage:
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : noopStorage,
  }),
  syncConnectedChain = true,
  ...rest
}: CreateConfigParameters<chains>): Config<chains> {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Set up connectors, clients, etc.
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const connectors = (rest.connectors ?? []).map(setup)
  function setup(connectorFn: CreateConnectorFn) {
    // Set up emitter with uid and add to connector so they are "linked" together.
    const emitter = createEmitter<ConnectorEventMap>(uid())
    const connector = {
      ...connectorFn({ emitter, chains, storage }),
      emitter,
      uid: emitter.uid,
    }

    // Start listening for `connect` events if `reconnectOnMount` is switched on.
    // This allows connectors to "connect" themselves without user interaction (e.g. MetaMask's "Manually connect to current site")
    if (reconnectOnMount) emitter.on('connect', connect)
    connector.setup?.()

    return connector
  }

  // TODO: WebSocket support
  const clients = new Map<number, Client>()
  function getClient(parameters: { chainId?: number | undefined } = {}) {
    const chainId = parameters.chainId ?? store.getState().chainId
    const chain = chains.find((x) => x.id === chainId)

    // If the target chain is not configured, use the client of the current chain.
    // TODO: should we error instead? idk. figure out later.
    {
      const client = clients.get(store.getState().chainId)
      if (client && !chain) return client
      else if (!chain) throw new ChainNotConfiguredError()
    }

    // If a memoized client exists for a chain id, use that.
    {
      const client = clients.get(chainId)
      if (client) return client
    }

    let client: Client
    if (rest.client) client = rest.client({ chain })
    else
      client = createClient({
        batch: { multicall: true },
        chain,
        pollingInterval: rest.pollingInterval as number,
        transport: rest.transports[chain.id as chains[number]['id']],
      })

    clients.set(chainId, client)
    return client
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create store
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const initialState: State = {
    chainId: chains[0].id,
    connections: new Map(),
    current: undefined,
    status: 'disconnected',
  }

  const store = createStore(
    subscribeWithSelector(
      storage
        ? persist(() => initialState, {
            name: 'store',
            partialize(state): PartializedState {
              return {
                chainId: state.chainId,
                connections: state.connections,
                current: state.current,
                status: state.status,
              }
            },
            skipHydration: !reconnectOnMount,
            storage: storage as Storage<Record<string, unknown>>,
            version: 1,
          })
        : () => initialState,
    ),
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Subscribe to changes
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Update default chain when connector chain changes
  if (syncConnectedChain)
    store.subscribe(
      ({ connections, current }) =>
        current ? connections.get(current)?.chainId : undefined,
      (chainId) => {
        // If chain is not configured, then don't switch over to it.
        const isChainConfigured = chains.some((x) => x.id === chainId)
        if (!isChainConfigured) return

        return store.setState((x) => ({
          ...x,
          chainId: chainId ?? x.chainId,
        }))
      },
    )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Emitter listeners
  /////////////////////////////////////////////////////////////////////////////////////////////////

  function change(data: EventData<ConnectorEventMap, 'change'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)!
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts: data.accounts ?? connection.accounts,
          chainId: data.chainId ?? connection.chainId,
          connector: connection.connector,
        }),
      }
    })
  }
  function connect(data: EventData<ConnectorEventMap, 'connect'>) {
    // Disable handling if reconnecting
    if (store.getState().status === 'reconnecting') return

    store.setState((x) => {
      const connector = connectors.find((x) => x.uid === data.uid)
      if (!connector) return x
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts: data.accounts,
          chainId: data.chainId,
          connector: connector,
        }),
        current: data.uid,
        status: 'connected',
      }
    })
  }
  function disconnect(data: EventData<ConnectorEventMap, 'disconnect'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)
      if (connection) {
        connection.connector.emitter.off('change', change)
        connection.connector.emitter.off('disconnect', disconnect)
        connection.connector.emitter.on('connect', connect)
      }

      x.connections.delete(data.uid)

      if (x.connections.size === 0)
        return {
          ...x,
          connections: new Map(),
          current: undefined,
          status: 'disconnected',
        }

      const nextConnection = x.connections.values().next().value as Connection
      return {
        ...x,
        connections: new Map(x.connections),
        current: nextConnection.connector.uid,
      }
    })
  }

  return {
    chains: chains as chains,
    connectors,
    get state() {
      return store.getState() as unknown as State<chains>
    },
    storage,

    getClient,
    setState(value) {
      const newState =
        typeof value === 'function' ? value(store.getState() as any) : value
      store.setState(newState, true)
    },
    subscribe(selector, listener, options) {
      return store.subscribe(
        selector as unknown as (state: State) => any,
        listener,
        options,
      )
    },

    _internal: {
      reconnectOnMount,
      syncConnectedChain,
      change,
      connect,
      disconnect,
      setup,
    },
  }
}
