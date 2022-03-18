import { client } from '../../client'
import { ConnectorNotFoundError } from '../../errors'

export async function disconnect(): Promise<void> {
  const connector = client.connector
  if (!connector) throw new ConnectorNotFoundError()

  await connector.disconnect()
  client.storage.removeItem('connected')
  client.clearState()
}
