import { BaseError } from './base.js'

export class WagmiConfigNotFoundError extends BaseError {
  override name = 'WagmiConfigNotFoundError'
  constructor() {
    super('`useConfig` must be used within `WagmiConfig`.')
  }
}
