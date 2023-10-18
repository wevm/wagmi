import { reconnect as reconnect_ } from './actions/reconnect.js'
import type { Config, State } from './createConfig.js'

type HydrateParameters = {
  initialState?: State
  reconnect?: boolean
}

export function hydrate(config: Config, args: HydrateParameters) {
  const { initialState, reconnect } = args

  if (initialState)
    config.setState({
      ...initialState,
      status: reconnect ? 'reconnecting' : 'disconnected',
    })

  return {
    async onMount() {
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
      if (reconnect) reconnect_(config)
    },
  }
}
