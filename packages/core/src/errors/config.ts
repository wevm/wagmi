import { BaseError } from './base.js'

export class ChainMismatchError extends BaseError {
  override name = 'ChainMismatchError'

  constructor({
    activeChain,
    targetChain,
  }: {
    activeChain: string
    targetChain: string
  }) {
    super('Chain mismatch', {
      details: `Expected "${targetChain}", received "${activeChain}".`,
    })
  }
}

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
