import { getClient } from '../../client'

export async function disconnect(): Promise<void> {
  const client = getClient()
  if (client.connector) await client.connector.disconnect()

  client.clearState()
  client.storage.removeItem('connected')
}
