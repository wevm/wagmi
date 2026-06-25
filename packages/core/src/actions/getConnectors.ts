import type { Config, Connector } from '../createConfig.js'

export type GetConnectorsReturnType<config extends Config = Config> =
  config['connectors']

const previousConnectorsByConfig = new WeakMap<Config, readonly Connector[]>()

/** https://wagmi.sh/core/api/actions/getConnectors */
export function getConnectors<config extends Config>(
  config: config,
): GetConnectorsReturnType<config> {
  const previousConnectors = previousConnectorsByConfig.get(config)
  const connectors = config.connectors

  if (
    previousConnectors &&
    previousConnectors.length === connectors.length &&
    previousConnectors.every(
      (connector, index) => connector === connectors[index],
    )
  )
    return previousConnectors as GetConnectorsReturnType<config>

  previousConnectorsByConfig.set(config, connectors)
  return connectors
}
