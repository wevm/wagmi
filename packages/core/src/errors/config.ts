import type { Address } from 'viem'

import type { Connector } from '../createConfig.js'
import { BaseError } from './base.js'

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

export type ConnectorChainMismatchErrorType = ConnectorAccountNotFoundError & {
  name: 'ConnectorChainMismatchError'
}
export class ConnectorChainMismatchError extends BaseError {
  override name = 'ConnectorChainMismatchError'
  constructor({
    connectionChainId,
    connectorChainId,
  }: {
    connectionChainId: number
    connectorChainId: number
  }) {
    super(
      `The current chain of the connector (id: ${connectorChainId}) does not match the connection's chain (id: ${connectionChainId}).`,
      {
        metaMessages: [
          `Current Chain ID:  ${connectorChainId}`,
          `Expected Chain ID: ${connectionChainId}`,
        ],
      },
    )
  }
}

export type ConnectorUnavailableReconnectingErrorType =
  ConnectorUnavailableReconnectingError & {
    name: 'ConnectorUnavailableReconnectingError'
  }
export class ConnectorUnavailableReconnectingError extends BaseError {
  override name = 'ConnectorUnavailableReconnectingError'
  constructor({ connector }: { connector: { name: string } }) {
    super(`Connector "${connector.name}" unavailable while reconnecting.`, {
      details: [
        'During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.',
        'All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.',
        'This error commonly occurs for connectors that asynchronously inject after reconnection has already started.',
      ].join(' '),
    })
  }
}
