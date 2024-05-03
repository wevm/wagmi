import type { Config, Connection, Connector } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type {
  ConnectorNotConnectedErrorType,
  ConnectorNotFoundErrorType,
} from '../errors/config.js'
import type { ConnectorParameter } from '../types/properties.js'

export type DisconnectParameters = ConnectorParameter

export type DisconnectReturnType = void

export type DisconnectErrorType =
  | ConnectorNotFoundErrorType
  | ConnectorNotConnectedErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://wagmi.sh/core/api/actions/disconnect */
export async function disconnect(
  config: Config,
  parameters: DisconnectParameters = {},
): Promise<DisconnectReturnType> {
  let connector: Connector | undefined
  if (parameters.connector) connector = parameters.connector
  else {
    const { connections, current } = config.state
    const connection = connections.get(current!)
    connector = connection?.connector
  }

  const connections = config.state.connections

  if (connector) {
    await connector.disconnect()
    connector.emitter.off('change', config._internal.events.change)
    connector.emitter.off('disconnect', config._internal.events.disconnect)
    connector.emitter.on('connect', config._internal.events.connect)

    connections.delete(connector.uid)
  }

  config.setState((x) => {
    // if no connections exist, move to disconnected state
    if (connections.size === 0)
      return {
        ...x,
        connections: new Map(),
        current: null,
        status: 'disconnected',
      }

    // switch over to another connection
    const nextConnection = connections.values().next().value as Connection
    return {
      ...x,
      connections: new Map(connections),
      current: nextConnection.connector.uid,
    }
  })

  // Set recent connector if exists
  {
    const current = config.state.current
    if (!current) return
    const connector = config.state.connections.get(current)?.connector
    if (!connector) return
    await config.storage?.setItem('recentConnectorId', connector.id)
  }
}
