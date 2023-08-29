import {
  type Config,
  type Connection,
  type Connector,
} from '../createConfig.js'
import { ConnectorNotFoundError } from '../errors/config.js'

export type DisconnectParameters = {
  connector?: Connector | undefined
}

export type DisconnectReturnType = void

export type DisconnectError = Error

/** https://wagmi.sh/core/actions/disconnect */
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

  if (!connector) throw new ConnectorNotFoundError()
  const connections = config.state.connections
  if (!connections.has(connector.uid)) throw new ConnectorNotFoundError()

  await connector.disconnect()
  connector.emitter.off('change', config._internal.change)
  connector.emitter.off('disconnect', config._internal.disconnect)
  connector.emitter.on('connect', config._internal.connect)

  connections.delete(connector.uid)

  config.setState((x) => {
    if (connections.size === 0)
      return {
        ...x,
        connections: new Map(),
        current: undefined,
        status: 'disconnected',
      }

    const nextConnection = connections.values().next().value as Connection
    return {
      ...x,
      connections: new Map(connections),
      current: nextConnection.connector.uid,
    }
  })
}
