import { BaseError } from './base.js'

export class WagmiProviderNotFoundError extends BaseError {
  override name = 'WagmiProviderNotFoundError'
  constructor() {
    super('`useConfig` must be used within `WagmiProvider`.')
  }
}
