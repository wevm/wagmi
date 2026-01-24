import type { Config } from '../createConfig.js'
import type { GetConnectorsReturnType } from './getConnectors.js'

export type WatchConnectorsParameters<config extends Config = Config> = {
  onChange(
    connections: GetConnectorsReturnType<config>,
    prevConnectors: GetConnectorsReturnType<config>,
  ): void
}

export type WatchConnectorsReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchConnectors */
export function watchConnectors<config extends Config>(
  config: config,
  parameters: WatchConnectorsParameters<config>,
): WatchConnectorsReturnType {
  const { onChange } = parameters
  return config._internal.connectors.subscribe((connectors, prevConnectors) => {
    onChange(Object.values(connectors), prevConnectors)
  })
}
