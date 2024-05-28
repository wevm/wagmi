import type { Config, Connection } from '../createConfig.js'
import type { Evaluate } from '../types/utils.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetConnectionsReturnType = Evaluate<Connection>[]

let previousConnections: Connection[] = []

/** https://wagmi.sh/core/api/actions/getConnections */
export function getConnections(config: Config): GetConnectionsReturnType {
  const connections = [...config.state.connections.values()]
  if (config.state.status === 'reconnecting') return previousConnections
  if (deepEqual(previousConnections, connections)) return previousConnections
  previousConnections = connections
  return connections
}
