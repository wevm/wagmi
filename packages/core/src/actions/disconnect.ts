import { type MutationOptions } from '@tanstack/query-core'

import {
  type Config,
  type Connection,
  type Connector,
  initialState,
} from '../config.js'
import { type Prettify } from '../types.js'

export type DisconnectParameters = {
  connector?: Connector | undefined
}

export async function disconnect(
  config: Config,
  { connector: connector_ }: DisconnectParameters = {},
) {
  let connector: Connector | undefined
  if (connector_) connector = connector_
  else {
    const { connections, current } = config.state
    const connection = connections.get(current!)
    connector = connection?.connector
  }

  if (!connector) return

  await connector.disconnect()
  connector.emitter.off('change', config._internal.change)
  connector.emitter.off('disconnect', config._internal.disconnect)
  connector.emitter.on('connect', config._internal.connect)

  const connections = config.state.connections
  connections.delete(connector.uid)

  config.setState((x) => {
    if (connections.size === 0) return initialState
    const nextConnection = connections.values().next().value as Connection
    return {
      ...x,
      connections: new Map(connections),
      current: nextConnection.connector.uid,
    }
  })
}

///////////////////////////////////////////////////////////////////////////
// Mutation

type DisconnectMutationVariables = { connector?: Connector } | void
type Options = MutationOptions<void, Error, DisconnectMutationVariables>

export type DisconnectMutationOptions = Prettify<
  Omit<Options, 'mutationFn' | 'mutationKey'> & DisconnectMutationVariables
>

export const disconnectMutationOptions = (
  config: Config,
  options: DisconnectMutationOptions,
) => {
  const connector = 'connector' in options ? options.connector : undefined
  return {
    ...options,
    mutationFn() {
      return disconnect(config, { connector })
    },
    mutationKey: ['disconnect', { connector }],
  } as const satisfies Options
}
