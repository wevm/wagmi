import { QueryClient } from '@tanstack/query-core'
import {
  type PersistedClient,
  type Persister,
} from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  type Address,
  type PublicClient,
  type Transport,
  createPublicClient,
} from 'viem'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import type { Chain } from './chain.js'
import { type ConnectorEventMap, type CreateConnectorFn } from './connector.js'
import { Emitter, type EventData, createEmitter } from './emitter.js'
import { type Storage, createStorage, noopStorage } from './storage.js'
import { uid } from './utils/uid.js'

export type CreateConfigParameters<TChain extends readonly Chain[]> = {
  connectors: CreateConnectorFn[]
  persister?: Persister | null
  queryClient?: QueryClient
  reconnectOnMount?: boolean
  storage?: Storage | null
} & (
  | {
      chains: TChain
      transports: Record<TChain[number]['id'], Transport>
    }
  | {
      publicClient: PublicClient // TODO: Infer `TChain` from `publicClient`
    }
  | {
      chains: TChain
      publicClient: (parameters: {
        chain: TChain[number]
      }) => PublicClient<Transport>
    }
)

export type Config<TChain extends readonly Chain[] = readonly Chain[]> = {
  readonly chains: TChain
  readonly connectors: readonly Connector[]
  readonly persister: Persister | null
  readonly queryClient: QueryClient
  readonly reconnectOnMount: boolean
  readonly state: State
  readonly storage: Storage | null

  getPublicClient(parameters?: { chainId?: number | undefined }): PublicClient
  reconnect(): Promise<void>
  setState(value: State | ((state: State) => State)): void
  subscribe: {
    (
      listener: (selectedState: State, previousSelectedState: State) => void,
    ): () => void
    <U>(
      selector: (state: State) => U,
      listener: (selectedState: U, previousSelectedState: U) => void,
      options?: {
        equalityFn?: (a: U, b: U) => boolean
        fireImmediately?: boolean
      },
    ): () => void
  }
  watchPublicClient(onChange: (publicClient: PublicClient) => void): () => void

  _internal: {
    change(data: EventData<ConnectorEventMap, 'change'>): void
    connect(data: EventData<ConnectorEventMap, 'connect'>): void
    disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void
    setup(connectorFn: CreateConnectorFn): Connector
  }
}

export type State = {
  connections: Map<string, Connection>
  current: string | undefined
  publicClient: PublicClient | undefined
  status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
}
export type PartializedState = Partial<
  Pick<State, 'connections' | 'current' | 'status'>
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
export const initialState: State = {
  connections: new Map(),
  current: undefined,
  publicClient: undefined,
  status: 'disconnected',
}

export function createConfig<const TChain extends readonly Chain[]>({
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false,
        retry: 0,
      },
      mutations: {
        networkMode: 'offlineFirst',
      },
    },
  }),
  reconnectOnMount = true,
  storage = createStorage({
    storage:
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : noopStorage,
  }),
  persister = typeof window !== 'undefined' && storage
    ? createSyncStoragePersister({
        key: 'cache',
        storage,
        // Serialization is handled in `storage`.
        serialize: (x) => x as unknown as string,
        // Deserialization is handled in `storage`.
        deserialize: (x) => x as unknown as PersistedClient,
      })
    : null,
  ...rest
}: CreateConfigParameters<TChain>): Config<TChain> {
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Set up chains, connectors, clients, etc.
  /////////////////////////////////////////////////////////////////////////////////////////////////

  let chains: readonly Chain[]
  const isMultichain = 'chains' in rest
  if (isMultichain) chains = rest.chains
  else chains = rest.publicClient.chain ? [rest.publicClient.chain] : []

  const connectors = rest.connectors.map(setup)
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

  const publicClients = new Map<number, PublicClient | undefined>()
  function getPublicClient({ chainId }: { chainId?: number | undefined } = {}) {
    if (!isMultichain) return rest.publicClient

    let publicClient = publicClients.get(-1)
    if (publicClient && publicClient.chain?.id === chainId) return publicClient

    publicClient = publicClients.get(chainId ?? -1)
    if (publicClient) return publicClient

    const chain = chains.find((x) => x.id === chainId) ?? chains[0]!

    if ('publicClient' in rest)
      publicClient =
        typeof rest.publicClient === 'function'
          ? rest.publicClient({ chain })
          : rest.publicClient
    else
      publicClient = createPublicClient({
        chain,
        transport: rest.transports[chain.id as TChain[number]['id']],
      })

    publicClients.set(chainId ?? -1, publicClient)
    return publicClient
  }
  function watchPublicClient(onChange: (publicClient: PublicClient) => void) {
    const handleChange = async () => onChange(getPublicClient())
    const unsubscribe = store.subscribe(
      ({ publicClient }) => publicClient,
      handleChange,
    )
    return unsubscribe
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create store
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const store = createStore(
    subscribeWithSelector(
      storage
        ? persist(() => initialState, {
            name: 'store',
            partialize(state): PartializedState {
              return {
                connections: state.connections,
                current: state.current,
                status: state.status,
              }
            },
            skipHydration: !reconnectOnMount,
            storage,
            version: 1,
          })
        : () => initialState,
    ),
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Subscribe to changes
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Update public client when chain changes
  if (isMultichain)
    store.subscribe(
      ({ connections, current }) =>
        current ? connections.get(current)?.chainId : undefined,
      (chainId) => {
        let publicClient: PublicClient | undefined
        try {
          publicClient = getPublicClient({ chainId })
        } catch (error) {
          console.warn(error)
        }
        return store.setState((x) => ({ ...x, publicClient }))
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

      if (x.connections.size === 0) return initialState
      const nextConnection = x.connections.values().next().value as Connection
      return {
        ...x,
        connections: new Map(x.connections),
        current: nextConnection.connector.uid,
      }
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Global values
  /////////////////////////////////////////////////////////////////////////////////////////////////

  let reconnecting = false

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Return
  /////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    chains: chains as TChain,
    connectors,
    persister,
    queryClient,
    reconnectOnMount,
    get state() {
      return store.getState()
    },
    storage,

    getPublicClient,
    async reconnect() {
      if (reconnecting) return
      reconnecting = true

      store.setState((x) => ({
        ...x,
        status: x.current ? 'reconnecting' : 'connecting',
      }))

      // Try recently-used connectors first
      const recentConnectorId = storage?.getItem('recentConnectorId')
      const scores: Record<string, number> = {
        ...(recentConnectorId ? { [recentConnectorId]: 1 } : {}),
      }
      for (const [, connection] of store.getState().connections) {
        scores[connection.connector.id] = 2
      }
      const sorted =
        Object.keys(scores).length > 0
          ? [...connectors].sort((x) => scores[x.id] ?? -1)
          : connectors

      const connections = new Map()
      let connected = false
      for (const connector of sorted) {
        const isAuthorized = await connector.isAuthorized()
        if (!isAuthorized) continue

        const data = await connector.connect()
        connector.emitter.off('connect', connect)
        connector.emitter.on('change', change)
        connector.emitter.on('disconnect', disconnect)

        store.setState((x) => ({
          ...x,
          current: connected ? x.current : connector.uid,
          connections: new Map(connected ? x.connections : connections).set(
            connector.uid,
            {
              accounts: data.accounts,
              chainId: data.chainId,
              connector,
            },
          ),
          status: 'connected',
        }))
        connected = true
      }

      // If connecting didn't succeed, set to disconnected
      if (!connected)
        store.setState((x) => ({
          ...x,
          ...initialState,
          status: 'disconnected',
        }))

      reconnecting = false
    },
    setState(value: State | ((state: State) => State)) {
      const newState =
        typeof value === 'function' ? value(store.getState()) : value
      store.setState(newState, true)
    },
    subscribe: store.subscribe,
    watchPublicClient,

    _internal: {
      change,
      connect,
      disconnect,
      setup: setup,
    },
  }
}
