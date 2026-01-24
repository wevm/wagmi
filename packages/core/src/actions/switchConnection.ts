import type { Address } from 'viem'

import type { Config, Connector } from '../createConfig.js'
import type { BaseError, ErrorType } from '../errors/base.js'
import {
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
} from '../errors/config.js'

export type SwitchConnectionParameters = {
  connector: Connector
}

export type SwitchConnectionReturnType<config extends Config = Config> = {
  accounts: readonly [Address, ...Address[]]
  chainId:
    | config['chains'][number]['id']
    | (number extends config['chains'][number]['id'] ? number : number & {})
}

export type SwitchConnectionErrorType =
  | ConnectorNotConnectedErrorType
  | BaseError
  | ErrorType

/** https://wagmi.sh/core/api/actions/switchConnection */
export async function switchConnection<config extends Config>(
  config: config,
  parameters: SwitchConnectionParameters,
): Promise<SwitchConnectionReturnType<config>> {
  const { connector } = parameters

  const connection = config.state.connections.get(connector.uid)
  if (!connection) throw new ConnectorNotConnectedError()

  await config.storage?.setItem('recentConnectorId', connector.id)
  config.setState((x) => ({
    ...x,
    current: connector.uid,
  }))
  return {
    accounts: connection.accounts,
    chainId: connection.chainId,
  }
}
