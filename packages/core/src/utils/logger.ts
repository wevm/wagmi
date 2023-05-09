import { getConfig } from '../config'

export function logWarn(message: string) {
  getConfig()?.args.logger?.warn?.(message)
}
