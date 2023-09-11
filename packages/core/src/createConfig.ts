import {
  type Address,
  type Chain,
  type Client,
  type ClientConfig as viem_ClientConfig,
  type Transport,
  createClient,
} from 'viem'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import {
  type ConnectorEventMap,
  type CreateConnectorFn,
} from './createConnector.js'
import { Emitter, type EventData, createEmitter } from './createEmitter.js'
import { type Storage, createStorage, noopStorage } from './createStorage.js'
import { ChainNotConfiguredError } from './errors/config.js'
import type { Evaluate, ExactPartial, LooseOmit, OneOf } from './types/utils.js'
import { uid } from './utils/uid.js'

export type CreateConfigParameters<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]['id'], Transport> = Record<
    chains[number]['id'],
    Transport
  >,
> = Evaluate<
  {
    chains: chains
    connectors?: CreateConnectorFn[] | undefined
    reconnectOnMount?: boolean | undefined
    storage?: Storage | null | undefined
    syncConnectedChain?: boolean | undefined
  } & OneOf<
    | ({ transports: transports } & {
        [key in keyof ClientConfig]?:
          | ClientConfig[key]
          | { [_ in chains[number]['id']]?: ClientConfig[key] | undefined }
          | undefined
      })
    | {
        client(parameters: { chain: chains[number] }): Client<
          transports[chains[number]['id']],
          chains[number]
        >
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
  transports extends Record<chains[number]['id'], Transport> = Record<
    chains[number]['id'],
    Transport
  >,
> = {
  readonly chains: chains
  readonly connectors: readonly Connector[]
  readonly state: State<chains>
  readonly storage: Storage | null

  getClient<chainId extends chains[number]['id']>(parameters?: {
    chainId?: chainId | chains[number]['id'] | undefined
  }): Client<transports[chainId], Extract<chains[number], { id: chainId }>>
  setState<tchains extends readonly [Chain, ...Chain[]] = chains>(
    value: State<tchains> | ((state: State<tchains>) => State<tchains>),
  ): void
  subscribe<state>(
    selector: (state: State<chains>) => state,
    listener: (selectedState: state, previousSelectedState: state) => void,
    options?:
      | {
          equalityFn?: ((a: state, b: state) => boolean) | undefined
          fireImmediately?: boolean | undefined
        }
      | undefined,
  ): () => void

  _internal: {
    readonly reconnectOnMount: boolean
    readonly syncConnectedChain: boolean
    readonly transports: transports

    change(data: EventData<ConnectorEventMap, 'change'>): void
    connect(data: EventData<ConnectorEventMap, 'connect'>): void
    disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void
    setup(connectorFn: CreateConnectorFn): Connector
  }
}

export function createConfig<
  const chains extends readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]['id'], Transport>,
>(
  parameters: CreateConfigParameters<chains, transports>,
): Config<chains, transports> {
  const {
    autoConnect,
    chains,
    reconnectOnMount = autoConnect ?? true,
    storage = createStorage({
      storage:
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : noopStorage,
    }),
    syncConnectedChain = true,
    ...rest
  } = parameters

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

  const clients = new Map<number, Client<Transport, chains[number]>>()
  function getClient<chainId extends chains[number]['id']>(
    config: { chainId?: chainId | chains[number]['id'] | undefined } = {},
  ): Client<Transport, Extract<chains[number], { id: chainId }>> {
    const chainId = config.chainId ?? store.getState().chainId
    const chain = chains.find((x) => x.id === chainId)

    // If the target chain is not configured, use the client of the current chain.
    // TODO: should we error instead? idk. figure out later.
    type Return = Client<Transport, Extract<chains[number], { id: chainId }>>
    {
      const client = clients.get(store.getState().chainId)
      if (client && !chain) return client as Return
      else if (!chain) throw new ChainNotConfiguredError()
    }

    // If a memoized client exists for a chain id, use that.
    {
      const client = clients.get(chainId)
      if (client) return client as Return
    }

    let client
    if (rest.client) client = rest.client({ chain })
    else {
      const chainId = chain.id as chains[number]['id']
      // Grab all properties off `rest` and resolve for use in `createClient`
      const properties: Partial<viem_ClientConfig> = {}
      const entries = Object.entries(rest) as [keyof typeof rest, any][]
      for (const [key, value] of entries) {
        if (key === 'client' || key === 'connectors' || key === 'transports')
          continue
        else {
          if (typeof value === 'object') properties[key] = value[chainId]
          else properties[key] = value
        }
      }
      client = createClient({
        ...properties,
        chain,
        batch: properties.batch ?? { multicall: true },
        transport: rest.transports[chainId],
      })
    }

    clients.set(chainId, client)
    return client as Return
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
      // only use persist middleware if storage exists
      storage
        ? persist(() => initialState, {
            name: 'store',
            partialize(state) {
              return {
                chainId: state.chainId,
                connections: state.connections,
                current: state.current,
                status: state.status,
              } satisfies PartializedState
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
          accounts:
            (data.accounts as readonly [Address, ...Address[]]) ??
            connection.accounts,
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
          accounts: data.accounts as readonly [Address, ...Address[]],
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
      let newState: State
      if (typeof value === 'function') newState = value(store.getState() as any)
      else newState = value

      // Reset state if it got set to something not matching the base state
      if (typeof newState !== 'object') newState = initialState
      const isCorrupt = Object.keys(initialState).some((x) => !(x in newState))
      if (isCorrupt) newState = initialState

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
      transports: rest.transports as transports,
      change,
      connect,
      disconnect,
      setup,
    },
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Types
/////////////////////////////////////////////////////////////////////////////////////////////////

export type State<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
> = {
  chainId: chains[number]['id']
  connections: Map<string, Connection>
  current: string | undefined
  status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
}

export type PartializedState = Evaluate<
  ExactPartial<Pick<State, 'chainId' | 'connections' | 'current' | 'status'>>
>

export type Connection = {
  accounts: readonly [Address, ...Address[]]
  chainId: number
  connector: Connector
}

export type Connector = ReturnType<CreateConnectorFn> & {
  emitter: Emitter<ConnectorEventMap>
  uid: string
}

type ClientConfig = LooseOmit<
  viem_ClientConfig,
  'account' | 'chain' | 'key' | 'name' | 'transport' | 'type'
>
