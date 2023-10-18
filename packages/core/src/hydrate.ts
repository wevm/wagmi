import { reconnect } from './actions/reconnect.js'
import type { Config, State } from './createConfig.js'

type HydrateParameters = {
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function hydrate(config: Config, parameters: HydrateParameters) {
  const { initialState, reconnectOnMount } = parameters

  if (initialState)
    config.setState({
      ...initialState,
      status: reconnectOnMount ? 'reconnecting' : 'disconnected',
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
      if (reconnectOnMount) reconnect(config)
    },
  }
}
