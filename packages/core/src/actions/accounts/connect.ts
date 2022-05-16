import { Client, client } from '../../client'
import { Connector, ConnectorData } from '../../connectors'
import { ConnectorAlreadyConnectedError } from '../../errors'
import { Provider } from '../../types'

export type ConnectArgs = {
  /** Connector to connect */
  connector: Connector
}

type Data<TProvider extends Provider = Provider> = Required<
  ConnectorData<TProvider>
>

export type ConnectResult<TProvider extends Provider = Provider> = {
  account: Data<TProvider>['account']
  chain: Data<TProvider>['chain']
  connector: Client<TProvider>['connector']
  provider: Data<TProvider>['provider']
}

export async function connect<TProvider extends Provider = Provider>({
  connector,
}: ConnectArgs): Promise<ConnectResult<TProvider>> {
  const activeConnector = client.connector
  if (connector.id === activeConnector?.id)
    throw new ConnectorAlreadyConnectedError()

  const data = await connector.connect()

  client.setLastUsedConnector(connector.id)
  client.setState((x) => ({ ...x, connector, chains: connector?.chains, data }))
  client.storage.setItem('connected', true)

  return { ...data, connector }
}
