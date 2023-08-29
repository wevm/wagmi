import type { Connector } from '../createConfig.js'
import { BaseError } from './base.js'

export class ProviderNotFoundError extends BaseError {
  override name = 'ProviderNotFoundError'
  constructor() {
    super('Provider not found.')
  }
}

export class SwitchChainNotSupportedError extends BaseError {
  override name = 'SwitchChainNotSupportedError'

  constructor({ connector }: { connector: Connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`)
  }
}
