export class WagmiError extends Error {
  // The original error from the catch block before rethrowing
  readonly originalError: Error | undefined

  constructor(originalError?: unknown) {
    super()
    if (originalError instanceof Error) {
      this.originalError = originalError
    }
  }
}

export class AddChainError extends WagmiError {
  name = 'AddChainError'
  message = 'Error adding chain'
}

export class ChainNotConfiguredError extends WagmiError {
  name = 'ChainNotConfigured'
  message = 'Chain not configured'
}

export class ConnectorAlreadyConnectedError extends WagmiError {
  name = 'ConnectorAlreadyConnectedError'
  message = 'Connector already connected'
}

export class ConnectorNotFoundError extends WagmiError {
  name = 'ConnectorNotFoundError'
  message = 'Connector not found'
}

export class SwitchChainError extends WagmiError {
  name = 'SwitchChainError'
  message = 'Error switching chain'
}

export class SwitchChainNotSupportedError extends WagmiError {
  name = 'SwitchChainNotSupportedError'
  message = 'Switch chain not supported by connector'
}

export class UserRejectedRequestError extends WagmiError {
  name = 'UserRejectedRequestError'
  message = 'User rejected request'
}
