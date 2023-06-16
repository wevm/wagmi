import { type MutationOptions } from '@tanstack/query-core'
import {
  type Address,
  ResourceUnavailableRpcError,
  UserRejectedRequestError,
} from 'viem'

import { type Config, type Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'
import { ConnectorAlreadyConnectedError } from '../errors/config.js'
import type { IsUndefined, Pretty } from '../types/utils.js'

export type ConnectParameters<config extends Config = Config> = {
  chainId?: config['chains'][number]['id'] | undefined
  connector: CreateConnectorFn | Connector
}

export type ConnectReturnType<config extends Config = Config> = {
  accounts: readonly Address[]
  chainId:
    | config['chains'][number]['id']
    | (number extends config['chains'][number]['id'] ? number : number & {})
}

export type ConnectError =
  // from `connect()`
  | ConnectorAlreadyConnectedError
  // from `connector.connect()`
  | UserRejectedRequestError
  | ResourceUnavailableRpcError
  // base
  | Error

/** https://wagmi.sh/core/actions/connect */
export async function connect<config extends Config>(
  config: config,
  { chainId, connector: connector_ }: ConnectParameters<config>,
): Promise<ConnectReturnType<config>> {
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
// TanStack Query

export type ConnectMutationData<config extends Config> = Pretty<
  ConnectReturnType<config>
>
export type ConnectMutationVariables<
  config extends Config,
  connector extends ConnectParameters['connector'] | undefined,
> = Pretty<
  {
    chainId?: ConnectParameters<config>['chainId']
  } & (IsUndefined<connector> extends false
    ? { connector?: ConnectParameters['connector'] | undefined }
    : { connector: ConnectParameters['connector'] | undefined })
>
export type ConnectMutationParameters<
  config extends Config,
  connector extends ConnectParameters['connector'] | undefined,
> = Pretty<{
  chainId?: ConnectParameters<config>['chainId']
  connector?: connector | ConnectParameters['connector'] | undefined
}>

/** https://wagmi.sh/core/actions/connect#tanstack-query */
export const connectMutationOptions = <
  config extends Config,
  connector extends ConnectParameters['connector'] | undefined,
>(
  config: Config,
  { chainId, connector }: ConnectMutationParameters<config, connector>,
) =>
  ({
    mutationFn(variables) {
      return connect(config, {
        chainId: variables.chainId ?? chainId,
        connector: (variables.connector ?? connector)!,
      })
    },
    mutationKey: ['connect', { connector, chainId }],
  }) as const satisfies MutationOptions<
    ConnectMutationData<config>,
    ConnectError,
    ConnectMutationVariables<config, connector>
  >
