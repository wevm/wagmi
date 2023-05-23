import { BaseError } from './base.js'

export class ChainNotConfiguredError extends BaseError {
  override name = 'ChainNotConfiguredError'
  constructor() {
    super('Chain not configured.')
  }
}

export class ConnectorAlreadyConnectedError extends BaseError {
  override name = 'ConnectorAlreadyConnectedError'
  constructor() {
    super('Connector already connected.')
  }
}

export class ConnectorNotFoundError extends BaseError {
  override name = 'ConnectorNotFoundError'
  constructor() {
    super('Connector not found.')
  }
}
