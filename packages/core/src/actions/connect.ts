import { ResourceUnavailableRpcError, UserRejectedRequestError } from 'viem'
import { type Address } from 'viem'

import { type Config, type Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorAlreadyConnectedError } from '../errors/config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'

export type ConnectParameters<config extends Config = Config> = Evaluate<
  {
    connector: Connector | CreateConnectorFn
  } & ChainIdParameter<config>
>

export type ConnectReturnType<config extends Config = Config> = {
  accounts: readonly [Address, ...Address[]]
  chainId:
    | config['chains'][number]['id']
    | (number extends config['chains'][number]['id'] ? number : number & {})
}

export type ConnectError =
  // connect()
  | ConnectorAlreadyConnectedError
  // connector.connect()
  | UserRejectedRequestError
  | ResourceUnavailableRpcError
  // base
  | BaseError
  | Error

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
    const accounts = data.accounts as readonly [Address, ...Address[]]

    connector.emitter.off('connect', config._internal.connect)
    connector.emitter.on('change', config._internal.change)
    connector.emitter.on('disconnect', config._internal.disconnect)

    config.storage?.setItem('recentConnectorId', connector.id)
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        accounts,
        chainId: data.chainId,
        connector: connector,
      }),
      current: connector.uid,
      status: 'connected',
    }))

    return {
      accounts,
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
