import { client } from '../client'

export function logWarning(message: string) {
  client?.config.logger?.warn?.(message)
}
