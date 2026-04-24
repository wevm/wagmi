import type { Account, Address } from 'viem'

import type { Config, Connector } from '../createConfig.js'
import { getConnectorClient } from './getConnectorClient.js'

type Parameters<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = {
  account?: Address | Account | undefined
  chainId?: chainId | config['chains'][number]['id'] | undefined
  connector?: Connector | undefined
  required?: boolean | undefined
}

export function getConnectorAccount<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: Parameters<config, chainId> & { required: false },
): Promise<Address | Account | undefined>

export function getConnectorAccount<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: Parameters<config, chainId>,
): Promise<Address | Account>

export async function getConnectorAccount<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: Parameters<config, chainId>,
): Promise<Address | Account | undefined> {
  const { account, chainId, connector, required = true } = parameters

  if (typeof account === 'object') return account

  const currentConnection = (() => {
    if (!config.state.current) return undefined
    return config.state.connections.get(config.state.current)
  })()

  const connection = connector
    ? config.state.connections.get(connector.uid)
    : currentConnection

  if (account) {
    if (!connection) return account

    if (!connector && !connection.connector.getClient) return account

    const connectorClient = await getConnectorClient(config, {
      assertChainId: false,
      chainId,
      connector,
    })

    if (
      connectorClient.account.type !== 'json-rpc' &&
      connectorClient.account.address.toLowerCase() === account.toLowerCase()
    )
      return connectorClient.account

    return account
  }

  if (!connector) {
    if (!currentConnection && !required) return undefined
    if (currentConnection && !currentConnection.connector.getClient)
      return currentConnection.accounts[0]
  }

  const connectorClient = await getConnectorClient(config, {
    assertChainId: false,
    chainId,
    connector,
  })
  return connectorClient.account
}
