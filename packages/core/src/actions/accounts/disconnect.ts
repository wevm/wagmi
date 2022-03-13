import { client } from '../../client'

export async function disconnect(): Promise<void> {
  await client.connector?.disconnect()
  client.storage?.removeItem('connected')
  client.clearState()
}
