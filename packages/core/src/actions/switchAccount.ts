import { type Config, type Connector } from '../config.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorNotFoundError } from '../errors/config.js'

export type SwitchAccountParameters = {
  connector: Connector
}

export type SwitchAccountReturnType = void

export type SwitchAccountError = ConnectorNotFoundError | BaseError | Error

/** https://wagmi.sh/core/actions/switchAccount */
export async function switchAccount(
  config: Config,
  { connector }: SwitchAccountParameters,
): Promise<SwitchAccountReturnType> {
  const connections = config.state.connections
  if (!connections.has(connector.uid)) throw new ConnectorNotFoundError()

  config.storage?.setItem('recentConnectorId', connector.id)
  config.setState((x) => ({
    ...x,
    current: connector.uid,
  }))
}
