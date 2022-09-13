import { getClient } from '../client'

export function logWarn(message: string) {
  getClient()?.config.logger?.warn?.(message)
}
