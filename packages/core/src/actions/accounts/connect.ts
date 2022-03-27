import { BaseProvider } from '@ethersproject/providers'

import { Client, client } from '../../client'
import { Connector, ConnectorData } from '../../connectors'
import { ConnectorAlreadyConnectedError } from '../../errors'

type Data = Required<ConnectorData<BaseProvider>>

export type ConnectResult = {
  account: Data['account']
  chain: Data['chain']
  connector: Client['connector']
  provider: Data['provider']
}

export async function connect(connector: Connector): Promise<ConnectResult> {
  const activeConnector = client.connector
  if (connector.id === activeConnector?.id)
    throw new ConnectorAlreadyConnectedError()

  const data = await connector.connect()

  client.setLastUsedConnector(connector.id)
  client.setState((x) => ({ ...x, connector, chains: connector?.chains, data }))
  client.storage.setItem('connected', true)

  return { ...data, connector }
}
