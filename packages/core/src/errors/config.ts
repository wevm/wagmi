import type { Address } from 'viem'

import type { Connector } from '../createConfig.js'
import { BaseError } from './base.js'

export type ChainMismatchErrorType = ChainMismatchError & {
  name: 'ChainMismatchError'
}
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

export type ChainNotConfiguredErrorType = ChainNotConfiguredError & {
  name: 'ChainNotConfiguredError'
}
export class ChainNotConfiguredError extends BaseError {
  override name = 'ChainNotConfiguredError'
  constructor() {
    super('Chain not configured.')
  }
}

export type ConnectorAlreadyConnectedErrorType =
  ConnectorAlreadyConnectedError & {
    name: 'ConnectorAlreadyConnectedError'
  }
export class ConnectorAlreadyConnectedError extends BaseError {
  override name = 'ConnectorAlreadyConnectedError'
  constructor() {
    super('Connector already connected.')
  }
}

export type ConnectorNotConnectedErrorType = ConnectorNotConnectedError & {
  name: 'ConnectorNotConnectedError'
}
export class ConnectorNotConnectedError extends BaseError {
  override name = 'ConnectorNotConnectedError'
  constructor() {
    super('Connector not connected.')
  }
}

export type ConnectorNotFoundErrorType = ConnectorNotFoundError & {
  name: 'ConnectorNotFoundError'
}
export class ConnectorNotFoundError extends BaseError {
  override name = 'ConnectorNotFoundError'
  constructor() {
    super('Connector not found.')
  }
}

export type ConnectorAccountNotFoundErrorType =
  ConnectorAccountNotFoundError & {
    name: 'ConnectorAccountNotFoundError'
  }
export class ConnectorAccountNotFoundError extends BaseError {
  override name = 'ConnectorAccountNotFoundError'
  constructor({
    address,
    connector,
  }: {
    address: Address
    connector: Connector
  }) {
    super(`Account "${address}" not found for connector "${connector.name}".`)
  }
}
