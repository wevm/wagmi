import type { Address } from 'viem'

import type { CreateConnectorFn } from '../connectors/createConnector.js'
import type { Config, Connection, Connector } from '../createConfig.js'
import type { ErrorType } from '../errors/base.js'
import type { Evaluate } from '../types/utils.js'

export type ReconnectParameters = {
  /** Connectors to attempt reconnect with */
  connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
}

export type ReconnectReturnType = Evaluate<Connection>[]

export type ReconnectErrorType = ErrorType

let isReconnecting = false

/** https://wagmi.sh/core/api/actions/reconnect */
export async function reconnect(
  config: Config,
  parameters: ReconnectParameters = {},
): Promise<ReconnectReturnType> {
  // If already reconnecting, do nothing
  if (isReconnecting) return []
  isReconnecting = true

  config.setState((x) => ({
    ...x,
    status: x.current ? 'reconnecting' : 'connecting',
  }))

  const connectors: Connector[] = []
  if (parameters.connectors?.length) {
    for (const connector_ of parameters.connectors) {
      let connector: Connector
      // "Register" connector if not already created
      if (typeof connector_ === 'function')
        connector = config._internal.connectors.setup(connector_)
      else connector = connector_
      connectors.push(connector)
    }
  } else connectors.push(...config.connectors)

  // Try recently-used connectors first
  let recentConnectorId: string | null | undefined
  try {
    recentConnectorId = await config.storage?.getItem('recentConnectorId')
  } catch {}
  const scores: Record<string, number> = {}
  for (const [, connection] of config.state.connections) {
    scores[connection.connector.id] = 1
  }
  if (recentConnectorId) scores[recentConnectorId] = 0
  const sorted =
    Object.keys(scores).length > 0
      ? // .toSorted()
        [...connectors].sort(
          (a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10),
        )
      : connectors

  // Iterate through each connector and try to connect
  let connected = false
  const connections: Connection[] = []
  const providers: unknown[] = []
  for (const connector of sorted) {
    const provider = await connector.getProvider().catch(() => undefined)
    if (!provider) continue

    // If we already have an instance of this connector's provider,
    // then we have already checked it (ie. injected connectors can
    // share the same `window.ethereum` instance, so we don't want to
    // connect to it again).
    if (providers.some((x) => x === provider)) continue

    const isAuthorized = await connector.isAuthorized()
    if (!isAuthorized) continue

    const data = await connector
      .connect({ isReconnecting: true })
      .catch(() => null)
    if (!data) continue

    connector.emitter.off('connect', config._internal.events.connect)
    connector.emitter.on('change', config._internal.events.change)
    connector.emitter.on('disconnect', config._internal.events.disconnect)

    config.setState((x) => {
      const connections = new Map(connected ? x.connections : new Map()).set(
        connector.uid,
        { accounts: data.accounts, chainId: data.chainId, connector },
      )
      return {
        ...x,
        current: connected ? x.current : connector.uid,
        connections,
      }
    })
    connections.push({
      accounts: data.accounts as readonly [Address, ...Address[]],
      chainId: data.chainId,
      connector,
    })
    providers.push(provider)
    connected = true
  }

  // Prevent overwriting connected status from race condition
  if (
    config.state.status === 'reconnecting' ||
    config.state.status === 'connecting'
  ) {
    // If connecting didn't succeed, set to disconnected
    if (!connected)
      config.setState((x) => ({
        ...x,
        connections: new Map(),
        current: null,
        status: 'disconnected',
      }))
    else config.setState((x) => ({ ...x, status: 'connected' }))
  }

  isReconnecting = false
  return connections
}
