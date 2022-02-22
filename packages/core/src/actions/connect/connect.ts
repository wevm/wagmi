import { WagmiClient, wagmiClient } from '../../client'
import { Connector } from '../../connectors'

type ConnectReturnData = {
  data: WagmiClient['data']
  connector: WagmiClient['connector']
}

export async function connect(
  connector: Connector,
): Promise<ConnectReturnData> {
  const activeConnector = wagmiClient?.connector
  if (connector === activeConnector)
    return { data: wagmiClient.data, connector }

  const data = await connector.connect()

  wagmiClient.setLastUsedConnector(connector.name)
  wagmiClient.setState((x) => ({ ...x, connector, data }))

  return { data, connector }
}
