import { wagmiClient } from '../client'

export async function disconnect(): Promise<void> {
  await wagmiClient.connector?.disconnect()
  wagmiClient.store.setState({}, true)
  return
}
