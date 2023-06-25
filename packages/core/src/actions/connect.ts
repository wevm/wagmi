import {
  type Address,
  ResourceUnavailableRpcError,
  UserRejectedRequestError,
} from 'viem'

import { type Config, type Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'
import { ConnectorAlreadyConnectedError } from '../errors/config.js'
import type { Mutate, MutateAsync, MutationOptions } from '../types/query.js'
import type { Evaluate, PartialBy } from '../types/utils.js'

export type ConnectParameters<config extends Config = Config> = {
  chainId?: config['chains'][number]['id'] | undefined
  connector: Connector | CreateConnectorFn
}

export type ConnectReturnType<config extends Config = Config> = {
  accounts: readonly Address[]
  chainId:
    | config['chains'][number]['id']
    | (number extends config['chains'][number]['id'] ? number : number & {})
}

/** https://wagmi.sh/core/actions/connect */
export async function connect<config extends Config>(
  config: config,
  parameters: ConnectParameters<config>,
): Promise<ConnectReturnType<config>> {
  // "Register" connector if not already created
  let connector: Connector
  if (typeof parameters.connector === 'function') {
    connector = config._internal.setup(parameters.connector)
  } else connector = parameters.connector

  // Check if connector is already connected
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError()

  try {
    config.setState((x) => ({ ...x, status: 'connecting' }))
    connector.emitter.emit('message', { type: 'connecting' })

    const data = await connector.connect({ chainId: parameters.chainId })

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

export type ConnectMutationOptions<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
> = {
  chainId?: ConnectParameters<config>['chainId']
  connector?: connector | ConnectParameters<config>['connector']
}

/** https://wagmi.sh/core/actions/connect#tanstack-query */
export function connectMutationOptions<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
>(config: config, parameters: ConnectMutationOptions<config, connector>) {
  return {
    getVariables(variables) {
      return {
        chainId: variables?.chainId ?? parameters.chainId,
        connector: (variables?.connector ?? parameters.connector)!,
      }
    },
    mutationFn(variables) {
      return connect(config, variables)
    },
    mutationKey: ['connect', parameters],
  } as const satisfies MutationOptions<
    ConnectReturnType<config>,
    ConnectError,
    ConnectVariables<config, undefined>,
    ConnectParameters
  >
}

export type ConnectError =
  // connect()
  | ConnectorAlreadyConnectedError
  // connector.connect()
  | UserRejectedRequestError
  | ResourceUnavailableRpcError
  // base
  | Error

export type ConnectVariables<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
> =
  | Evaluate<
      PartialBy<
        ConnectParameters<config>,
        connector extends Connector | CreateConnectorFn ? 'connector' : never
      >
    >
  | (connector extends Connector | CreateConnectorFn ? undefined : never)

export type ConnectMutate<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
  context = unknown,
> = Mutate<
  ConnectReturnType<config>,
  ConnectError,
  ConnectParameters<config>,
  context,
  ConnectVariables<config, connector>
>

export type ConnectMutateAsync<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
  context = unknown,
> = MutateAsync<
  ConnectReturnType<config>,
  ConnectError,
  ConnectParameters<config>,
  context,
  ConnectVariables<config, connector>
>
