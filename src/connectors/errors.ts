export class ConnectorError extends Error {
  error: any

  constructor(message?: string, error?: any) {
    super(message)
    this.error = error
  }
}

export class AddChainError extends ConnectorError {
  name = 'AddChainError'
}

export class ChainNotConfiguredError extends ConnectorError {
  name = 'ChainNotConfigured'
}

export class UserRejectedRequestError extends ConnectorError {
  name = 'ConnectionError'
}

export class ConnectorNotFoundError extends ConnectorError {
  name = 'ConnectorNotFoundError'
}

export class SwitchChainError extends ConnectorError {
  name = 'SwitchChainError'
}
