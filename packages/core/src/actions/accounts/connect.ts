import { WagmiClient, wagmiClient } from '../../client'
import { Connector } from '../../connectors'
import { ConnectorAlreadyConnectedError } from '../../errors'

export type ConnectResult = {
  data: WagmiClient['data']
  connector: WagmiClient['connector']
}

export async function connect(connector: Connector): Promise<ConnectResult> {
  const activeConnector = wagmiClient?.connector
  if (connector === activeConnector) throw new ConnectorAlreadyConnectedError()

  const data = await connector.connect()

  wagmiClient.setLastUsedConnector(connector.name)
  wagmiClient.setState((x) => ({ ...x, connector, data }))

  return { data, connector }
}
