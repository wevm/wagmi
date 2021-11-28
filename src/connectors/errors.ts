export class ConnectorError extends Error {
  error: any

  constructor(message?: string, error?: any) {
    super(message)
    this.error = error
  }
}

export class AddChainError extends ConnectorError {
  name = 'AddChainError'
  message = 'Error adding chain'
}

export class ChainNotConfiguredError extends ConnectorError {
  name = 'ChainNotConfigured'
  message = 'Chain not configured'
}

export class UserRejectedRequestError extends ConnectorError {
  name = 'UserRejectedRequestError'
  message = 'User rejected request'
}

export class ConnectorNotFoundError extends ConnectorError {
  name = 'ConnectorNotFoundError'
  message = 'Connector not found'
}

export class SwitchChainError extends ConnectorError {
  name = 'SwitchChainError'
  message = 'Error switching chain'
}
