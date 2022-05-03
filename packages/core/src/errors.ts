export class WrappedError extends Error {
  // The original error from the catch block before rethrowing
  readonly originalError: Error | undefined

  constructor(originalError: unknown) {
    super()
    if (originalError instanceof Error) {
      this.originalError = originalError
    }
  }
}

export class AddChainError extends Error {
  name = 'AddChainError'
  message = 'Error adding chain'
}

export class ChainNotConfiguredError extends Error {
  name = 'ChainNotConfigured'
  message = 'Chain not configured'
}

export class ConnectorAlreadyConnectedError extends Error {
  name = 'ConnectorAlreadyConnectedError'
  message = 'Connector already connected'
}

export class ConnectorNotFoundError extends Error {
  name = 'ConnectorNotFoundError'
  message = 'Connector not found'
}

export class SwitchChainError extends WrappedError {
  name = 'SwitchChainError'
  message = 'Error switching chain'
}

export class SwitchChainNotSupportedError extends Error {
  name = 'SwitchChainNotSupportedError'
  message = 'Switch chain not supported by connector'
}

export class UserRejectedRequestError extends WrappedError {
  name = 'UserRejectedRequestError'
  message = 'User rejected request'
}
