import { BaseError } from './base.js'

export class ProviderNotFoundError extends BaseError {
  override name = 'ProviderNotFoundError'
  constructor() {
    super('Provider not found.')
  }
}
