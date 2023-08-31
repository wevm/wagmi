export class ChainNotConfiguredForConnectorError extends Error {
  name = 'ChainNotConfiguredForConnectorError'

  constructor({
    chainId,
    connectorId,
  }: {
    chainId: number
    connectorId?: string
  }) {
    super(`Chain "${chainId}" not configured for connector "${connectorId}".`)
  }
}

export class ConnectorNotFoundError extends Error {
  name = 'ConnectorNotFoundError'
  message = 'Connector not found'
}
