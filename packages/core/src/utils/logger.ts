import { getConfig } from '../config'

export function logWarn(message: string) {
  getConfig()?.constructorArgs.logger?.warn?.(message)
}
