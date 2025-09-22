import type { Config, Connector } from '../createConfig.js'

export type GetConnectorsReturnType<config extends Config = Config> =
  config['connectors']

let previousConnectors: readonly Connector[] = []

/** https://wagmi.sh/core/api/actions/getConnectors */
export function getConnectors<config extends Config>(
  config: config,
): GetConnectorsReturnType<config> {
  const connectors = config.connectors
  if (
    previousConnectors.length === connectors.length &&
    previousConnectors.every(
      (connector, index) => connector === connectors[index],
    )
  )
    return previousConnectors
  previousConnectors = connectors
  return connectors
}
