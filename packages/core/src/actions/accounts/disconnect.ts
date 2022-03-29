import { client } from '../../client'

export async function disconnect(): Promise<void> {
  if (client.connector) await client.connector.disconnect()

  client.clearState()
  client.storage.removeItem('connected')
}
