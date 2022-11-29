import type { Client } from '../../client'
import { getClient } from '../../client'
import type { Connector, ConnectorData } from '../../connectors'
import { ConnectorAlreadyConnectedError } from '../../errors'
import type { Provider } from '../../types'

export type ConnectArgs = {
  /** Chain ID to connect to */
  chainId?: number
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
  chainId,
  connector,
}: ConnectArgs): Promise<ConnectResult<TProvider>> {
  const client = getClient()
  const activeConnector = client.connector
  if (activeConnector && connector.id === activeConnector.id)
    throw new ConnectorAlreadyConnectedError()

  try {
    client.setState((x) => ({ ...x, status: 'connecting' }))

    const data = await connector.connect({ chainId })

    client.setLastUsedConnector(connector.id)
    client.setState((x) => ({
      ...x,
      connector,
      chains: connector?.chains,
      data,
      status: 'connected',
    }))
    client.storage.setItem('connected', true)

    return { ...data, connector } as const
  } catch (err) {
    client.setState((x) => {
      return {
        ...x,
        // Keep existing connector connected in case of error
        status: x.connector ? 'connected' : 'disconnected',
      }
    })
    throw err
  }
}
