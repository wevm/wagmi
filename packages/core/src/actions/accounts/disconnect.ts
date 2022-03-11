import { wagmiClient } from '../../client'

export async function disconnect(): Promise<void> {
  await wagmiClient.connector?.disconnect()
  wagmiClient.storage?.removeItem('connected')
  wagmiClient.clearState()
}
