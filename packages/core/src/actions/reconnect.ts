import { type MutationOptions } from '@tanstack/query-core'

import type { Config, Connection, Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'
import type { Pretty } from '../types/utils.js'

export type ReconnectParameters = {
  /** Connectors to attempt reconnect with */
  connectors?:
    | [CreateConnectorFn | Connector, ...(CreateConnectorFn | Connector)[]]
    | undefined
}

export type ReconnectReturnType = Pretty<Connection>[]

export type ReconnectError = Error

let isReconnecting = false

/** https://wagmi.sh/core/actions/reconnect */
export async function reconnect(
  config: Config,
  { connectors: connectors_ }: ReconnectParameters = {},
): Promise<ReconnectReturnType> {
  // If already reconnecting, do nothing
  if (isReconnecting) return []
  isReconnecting = true

  config.setState((x) => ({
    ...x,
    status: x.current ? 'reconnecting' : 'connecting',
  }))

  const connectors: Connector[] = []
  if (connectors_?.length) {
    for (const connector_ of connectors_) {
      let connector: Connector
      // "Register" connector if not already created
      if (typeof connector_ === 'function')
        connector = config._internal.setup(connector_)
      else connector = connector_
      connectors.push(connector)
    }
  } else connectors.push(...config.connectors)

  // Try recently-used connectors first
  const recentConnectorId = config.storage?.getItem('recentConnectorId')
  const scores: Record<string, number> = {}
  for (const [, connection] of config.state.connections) {
    scores[connection.connector.id] = 1
  }
  if (recentConnectorId) scores[recentConnectorId] = 0
  const sorted =
    Object.keys(scores).length > 0
      ? [...connectors].sort(
          (a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10),
        )
      : connectors

  // Iterate through each connector and try to connect
  let connected = false
  const connections = []
  for (const connector of sorted) {
    const isAuthorized = await connector.isAuthorized()
    if (!isAuthorized) continue

    const data = await connector.connect()
    connector.emitter.off('connect', config._internal.connect)
    connector.emitter.on('change', config._internal.change)
    connector.emitter.on('disconnect', config._internal.disconnect)

    config.setState((x) => {
      const connections = new Map(connected ? x.connections : new Map()).set(
        connector.uid,
        { accounts: data.accounts, chainId: data.chainId, connector },
      )
      return {
        ...x,
        current: connected ? x.current : connector.uid,
        connections,
      }
    })
    connections.push({
      accounts: data.accounts,
      chainId: data.chainId,
      connector,
    })
    connected = true
  }

  // If connecting didn't succeed, set to disconnected
  if (!connected)
    config.setState((x) => ({
      ...x,
      connections: new Map(),
      current: undefined,
      status: 'disconnected',
    }))
  else config.setState((x) => ({ ...x, status: 'connected' }))

  isReconnecting = false
  return connections
}

///////////////////////////////////////////////////////////////////////////
// TanStack Query

export type ReconnectMutationData = Pretty<ReconnectReturnType>
export type ReconnectMutationVariables = Pretty<{
  connectors?:
    | [CreateConnectorFn | Connector, ...(CreateConnectorFn | Connector)[]]
    | undefined
}> | void
export type ReconnectMutationParameters = Pretty<{
  connectors?:
    | [CreateConnectorFn | Connector, ...(CreateConnectorFn | Connector)[]]
    | undefined
}>

/** https://wagmi.sh/core/actions/reconnect#tanstack-query */
export const reconnectMutationOptions = (
  config: Config,
  { connectors }: ReconnectMutationParameters = {},
) =>
  ({
    mutationFn(variables) {
      const connectors_ = variables?.connectors ?? connectors
      return reconnect(config, { connectors: connectors_ })
    },
    mutationKey: ['reconnect', { connectors }],
  }) as const satisfies MutationOptions<
    ReconnectMutationData,
    ReconnectError,
    ReconnectMutationVariables
  >
