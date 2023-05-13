import { type MutationOptions } from '@tanstack/query-core'
import {
  type Address,
  ResourceUnavailableRpcError,
  UserRejectedRequestError,
} from 'viem'

import { type Config, type Connector } from '../config.js'
import { type CreateConnectorFn } from '../connectors/connector.js'
import { ConnectorAlreadyConnectedError } from '../errors.js'
import { type Prettify } from '../types.js'

export type ConnectParameters = {
  chainId?: number | undefined
  connector: CreateConnectorFn | Connector
}

export type ConnectReturnType = {
  accounts: readonly Address[]
  chainId: number
}

export async function connect(
  config: Config,
  { chainId, connector: connector_ }: ConnectParameters,
): Promise<ConnectReturnType> {
  // "Register" connector if not already created
  let connector: Connector
  if (typeof connector_ === 'function') {
    connector = config._internal.setup(connector_)
  } else connector = connector_

  // Check if connector is already connected
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError()

  try {
    config.setState((x) => ({ ...x, status: 'connecting' }))
    connector.emitter.emit('message', { type: 'connecting' })

    const data = await connector.connect({ chainId })

    connector.emitter.off('connect', config._internal.connect)
    connector.emitter.on('change', config._internal.change)
    connector.emitter.on('disconnect', config._internal.disconnect)

    config.storage?.setItem('recentConnectorId', connector.id)
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        accounts: data.accounts,
        chainId: data.chainId,
        connector: connector,
      }),
      current: connector.uid,
      status: 'connected',
    }))

    return {
      accounts: data.accounts,
      chainId: data.chainId,
    }
  } catch (err) {
    config.setState((x) => {
      return {
        ...x,
        // Keep existing connector connected in case of error
        status: x.current ? 'connected' : 'disconnected',
      }
    })
    throw err
  }
}

///////////////////////////////////////////////////////////////////////////
// Mutation

type ConnectMutationData = ConnectReturnType
type ConnectMutationError =
  // from `connect()`
  | ConnectorAlreadyConnectedError
  // from `connector.connect()`
  | UserRejectedRequestError
  | ResourceUnavailableRpcError
  // base
  | Error
type ConnectMutationVariables = {
  chainId?: number | undefined
  connector?: CreateConnectorFn | Connector | undefined
}
type Options = MutationOptions<
  ConnectMutationData,
  ConnectMutationError,
  ConnectMutationVariables
>

export type ConnectMutationOptions = Prettify<
  Omit<Options, 'mutationFn' | 'mutationKey'> & ConnectMutationVariables
>

export const connectMutationOptions = (
  config: Config,
  { chainId, connector, ...rest }: ConnectMutationOptions,
) =>
  ({
    ...rest,
    mutationFn(variables) {
      const connector_ = variables.connector ?? connector
      if (!connector_) throw new Error('"connector" is required')
      return connect(config, {
        chainId: variables.chainId ?? chainId,
        connector: connector_,
      })
    },
    mutationKey: ['connect', { connector, chainId }],
  }) as const satisfies Options
