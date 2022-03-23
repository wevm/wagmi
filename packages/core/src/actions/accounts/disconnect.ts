import { client } from '../../client'

export async function disconnect(): Promise<void> {
  if (client.connector) await client.connector.disconnect()

  client.storage.removeItem('connected')
  client.clearState()
}
