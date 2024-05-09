import { type Config } from '../createConfig.js'
import { type ErrorType } from '../errors/base.js'

export type RevalidateReturnType = void

export type ReconnectErrorType = ErrorType

let isRevalidating = false

export async function revalidate(
  config: Config,
): Promise<RevalidateReturnType> {
  // If already revalidating, do nothing
  if (isRevalidating) return
  isRevalidating = true

  // Check connections to see if they are still active
  const connections = config.state.connections
  for (const [, connection] of connections) {
    const connector = connection.connector
    // check if `connect.isAuthorized` exists
    // partial connectors in storage do not have it
    const isAuthorized = connector.isAuthorized
      ? await connector.isAuthorized()
      : false
    if (isAuthorized) continue
    // Remove stale connection
    connections.delete(connector.uid)
  }

  // set connections
  config.setState((x) => ({ ...x, connections }))
  isRevalidating = false
}
