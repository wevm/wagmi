import type { Config, Connection } from '../config.js'
import { type Evaluate, deepEqual } from '../internal.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetConnectionsReturnType = Evaluate<Connection>[]

let previousConnections: Connection[] = []

/** https://wagmi.sh/core/actions/getConnections */
export function getConnections(config: Config): GetConnectionsReturnType {
  const connections = [...config.state.connections.values()]
  if (config.state.status === 'reconnecting') return previousConnections
  if (deepEqual(previousConnections, connections)) return previousConnections
  previousConnections = connections
  return connections
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchConnectionsParameters = {
  onChange(data: GetConnectionsReturnType): void
}

export type WatchConnectionsReturnType = () => void

/** https://wagmi.sh/core/actions/getConnections#watcher */
export function watchConnections(
  config: Config,
  { onChange }: WatchConnectionsParameters,
): WatchConnectionsReturnType {
  return config.subscribe(() => getConnections(config), onChange, {
    equalityFn: deepEqual,
  })
}
