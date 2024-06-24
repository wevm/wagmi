import { reconnect } from './actions/reconnect.js'
import type { Config, State } from './createConfig.js'

type HydrateParameters = {
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function hydrate(config: Config, parameters: HydrateParameters) {
  const { initialState, reconnectOnMount } = parameters

  if (initialState && !config._internal.store.persist.hasHydrated())
    config.setState({
      ...initialState,
      chainId: config.chains.some((x) => x.id === initialState.chainId)
        ? initialState.chainId
        : config.chains[0].id,
      connections: reconnectOnMount ? initialState.connections : new Map(),
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
      else if (config.storage)
        // Reset connections that may have been hydrated from storage.
        config.setState((x) => ({
          ...x,
          connections: new Map(),
        }))
    },
  }
}
