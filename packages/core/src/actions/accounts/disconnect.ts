import { getConfig } from '../../config'

export async function disconnect(): Promise<void> {
  const config = getConfig()
  if (config.connector) await config.connector.disconnect()

  config.clearState()
  config.storage.removeItem('connected')
}
