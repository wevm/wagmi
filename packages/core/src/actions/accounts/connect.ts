import { Client, client } from '../../client'
import { Connector } from '../../connectors'
import { ConnectorAlreadyConnectedError } from '../../errors'

export type ConnectResult = {
  data: Client['data']
  connector: Client['connector']
}

export async function connect(connector: Connector): Promise<ConnectResult> {
  const activeConnector = client.connector
  if (connector.id === activeConnector?.id)
    throw new ConnectorAlreadyConnectedError()

  const data = await connector.connect()

  client.setLastUsedConnector(connector.id)
  client.setState((x) => ({ ...x, connector, chains: connector?.chains, data }))
  client.storage.setItem('connected', true)

  return { data, connector }
}
