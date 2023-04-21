import type { Connector } from './connectors'

export { ConnectorNotFoundError } from '@wagmi/connectors'

export class ChainMismatchError extends Error {
  name = 'ChainMismatchError'

  constructor({
    activeChain,
    targetChain,
  }: {
    activeChain: string
    targetChain: string
  }) {
    super(
      `Chain mismatch: Expected "${targetChain}", received "${activeChain}".`,
    )
  }
}

export class ChainNotConfiguredError extends Error {
  name = 'ChainNotConfigured'

  constructor({
    chainId,
    connectorId,
  }: {
    chainId: number
    connectorId?: string
  }) {
    super(
      `Chain "${chainId}" not configured${
        connectorId ? ` for connector "${connectorId}"` : ''
      }.`,
    )
  }
}

export class ConnectorAlreadyConnectedError extends Error {
  name = 'ConnectorAlreadyConnectedError'
  message = 'Connector already connected'
}

export class ClientChainsNotFound extends Error {
  name = 'ClientChainsNotFound'
  message =
    'No chains were found on the wagmi Client. Some functions that require a chain may not work.'
}

export class SwitchChainNotSupportedError extends Error {
  name = 'SwitchChainNotSupportedError'

  constructor({ connector }: { connector: Connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`)
  }
}
