import { client } from '../../client'

export async function disconnect(): Promise<void> {
  console.log({ client })
  await client.connector?.disconnect?.()
  client.storage?.removeItem('connected')
  client.clearState()
}
