import { reconnect } from './actions/reconnect.js'
import type { Config } from './createConfig.js'

type HydrateParameters = {
  reconnect?: boolean
}

export async function hydrate(config: Config, args: HydrateParameters) {
  if (config._internal.ssr) {
    await config._internal.store.persist.rehydrate()

    const mipdConnectors = config._internal.mipd
      ?.getProviders()
      .map(config._internal.connectors.providerDetailToConnector)
      .map(config._internal.connectors.setup)
    config._internal.connectors.setState((connectors) => [
      ...connectors,
      ...(mipdConnectors ?? []),
    ])
  }
  if (args.reconnect) reconnect(config)
}
