import { type MutationOptions } from '@tanstack/query-core'

import { type Config, type Connection, type Connector } from '../config.js'
import type { OmittedMutationOptions } from '../types/query.js'
import { type Prettify } from '../types/utils.js'

export type DisconnectParameters = {
  connector?: Connector | undefined
}

export type DisconnectError = Error

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

  // TODO: Throw connector not connected error
  if (!connector) throw new Error('No connector found')

  await connector.disconnect()
  connector.emitter.off('change', config._internal.change)
  connector.emitter.off('disconnect', config._internal.disconnect)
  connector.emitter.on('connect', config._internal.connect)

  const connections = config.state.connections
  connections.delete(connector.uid)

  config.setState((x) => {
    if (connections.size === 0)
      return {
        ...x,
        connections: new Map(),
        current: undefined,
        status: 'disconnected',
      }

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

export type DisconnectMutationData = void
export type DisconnectMutationVariables = { connector?: Connector } | void

export type DisconnectMutationOptions = Prettify<
  Omit<Options, OmittedMutationOptions> & DisconnectMutationVariables
>
type Options = MutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

export const disconnectMutationOptions = (
  config: Config,
  options: DisconnectMutationOptions,
) => {
  const connector = 'connector' in options ? options.connector : undefined
  return {
    ...options,
    mutationFn(variables) {
      const connector_ =
        (variables as DisconnectParameters | undefined)?.connector ?? connector
      return disconnect(config, { connector: connector_ })
    },
    mutationKey: ['disconnect', { connector }],
  } as const satisfies Options
}
