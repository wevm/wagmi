import { wagmiClient } from '../client'

export async function disconnect(): Promise<void> {
  await wagmiClient.disconnect()
  return
}
