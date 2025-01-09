import type { Config, Connector } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetConnectorsReturnType<config extends Config = Config> =
  config['connectors']

let previousConnectors: readonly Connector[] = []

/** https://wagmi.sh/core/api/actions/getConnectors */
export function getConnectors<config extends Config>(
  config: config,
): GetConnectorsReturnType<config> {
  const connectors = config.connectors
  if (deepEqual(previousConnectors, connectors)) return previousConnectors
  previousConnectors = connectors
  return connectors
}
