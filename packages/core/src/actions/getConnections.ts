import type { Config, Connection } from '../config.js'
import { deepEqual } from '../internal.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetConnectionsReturnType = Connection[]

let previousConnections: Connection[] = []

export function getConnections(config: Config): GetConnectionsReturnType {
  const connections = [...config.state.connections.values()]
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

export function watchConnections(
  config: Config,
  { onChange }: WatchConnectionsParameters,
): WatchConnectionsReturnType {
  return config.subscribe(() => getConnections(config), onChange, {
    equalityFn: deepEqual,
  })
}
