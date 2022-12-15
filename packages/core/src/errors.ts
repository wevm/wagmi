import type { Logger } from 'ethers/lib/utils.js'

import { getProvider } from './actions'
import type { Chain } from './chains'
import type { Connector } from './connectors'

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
export class RpcError<T = undefined> extends Error {
  readonly cause: unknown
  readonly code: number
  readonly data?: T

  constructor(
    /** Human-readable string */
    message: string,
    options: {
      cause?: unknown
      /** Number error code */
      code: number
      /** Other useful information about error */
      data?: T
    },
  ) {
    const { cause, code, data } = options
    if (!Number.isInteger(code)) throw new Error('"code" must be an integer.')
    if (!message || typeof message !== 'string')
      throw new Error('"message" must be a nonempty string.')

    super(message)
    this.cause = cause
    this.code = code
    this.data = data
  }
}

/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
export class ProviderRpcError<T = undefined> extends RpcError<T> {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(
    /** Human-readable string */
    message: string,
    options: {
      cause?: unknown
      /**
       * Number error code
       * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
       */
      code: 4001 | 4100 | 4200 | 4900 | 4901 | 4902
      /** Other useful information about error */
      data?: T
    },
  ) {
    const { cause, code, data } = options
    if (!(Number.isInteger(code) && code >= 1000 && code <= 4999))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999',
      )

    super(message, { cause, code, data })
  }
}

export class AddChainError extends Error {
  name = 'AddChainError'
  message = 'Error adding chain'
}

export class ChainDoesNotSupportMulticallError extends Error {
  name = 'ChainDoesNotSupportMulticall'

  constructor({ blockNumber, chain }: { blockNumber?: number; chain: Chain }) {
    super(
      `Chain "${chain.name}" does not support multicall${
        blockNumber ? ` on block ${blockNumber}` : ''
      }.`,
    )
  }
}

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
    connectorId: string
  }) {
    super(`Chain "${chainId}" not configured for connector "${connectorId}".`)
  }
}

export class ConnectorAlreadyConnectedError extends Error {
  name = 'ConnectorAlreadyConnectedError'
  message = 'Connector already connected'
}

export class ConnectorNotFoundError extends Error {
  name = 'ConnectorNotFoundError'
  message = 'Connector not found'
}

export class ContractMethodDoesNotExistError extends Error {
  name = 'ContractMethodDoesNotExistError'

  constructor({
    address,
    chainId,
    functionName,
  }: {
    address: string
    chainId?: number
    functionName: string
  }) {
    const { chains, network } = getProvider()
    const chain = chains?.find(({ id }) => id === (chainId || network.chainId))
    const blockExplorer = chain?.blockExplorers?.default
    super(
      [
        `Function "${functionName}" on contract "${address}" does not exist.`,
        ...(blockExplorer
          ? [
              '',
              `${blockExplorer?.name}: ${blockExplorer?.url}/address/${address}#readContract`,
            ]
          : []),
      ].join('\n'),
    )
  }
}

export class ContractMethodNoResultError extends Error {
  name = 'ContractMethodNoResultError'

  constructor({
    address,
    args,
    chainId,
    functionName,
  }: {
    address: string
    args: any
    chainId: number
    functionName: string
  }) {
    super(
      [
        'Contract read returned an empty response. This could be due to any of the following:',
        `- The contract does not have the function "${functionName}",`,
        '- The parameters passed to the contract function may be invalid, or',
        '- The address is not a contract.',
        '',
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: '...',
            functionName,
            chainId,
            args,
          },
          null,
          2,
        ),
      ].join('\n'),
    )
  }
}

export class ContractMethodRevertedError extends Error {
  name = 'ContractMethodRevertedError'

  constructor({
    address,
    args,
    chainId,
    functionName,
    errorMessage,
  }: {
    address: string
    args: any
    chainId: number
    functionName: string
    errorMessage: string
  }) {
    super(
      [
        'Contract method reverted with an error.',
        '',
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: '...',
            functionName,
            chainId,
            args,
          },
          null,
          2,
        ),
        '',
        `Details: ${errorMessage}`,
      ].join('\n'),
    )
  }
}

export class ContractResultDecodeError extends Error {
  name = 'ContractResultDecodeError'

  constructor({
    address,
    args,
    chainId,
    functionName,
    errorMessage,
  }: {
    address: string
    args: any
    chainId: number
    functionName: string
    errorMessage: string
  }) {
    super(
      [
        'Failed to decode contract function result.',
        '',
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: '...',
            functionName,
            chainId,
            args,
          },
          null,
          2,
        ),
        '',
        `Details: ${errorMessage}`,
      ].join('\n'),
    )
  }
}

export class ProviderChainsNotFound extends Error {
  name = 'ProviderChainsNotFound'
  message = [
    'No chains were found on the wagmi provider. Some functions that require a chain may not work.',
    '',
    'It is recommended to add a list of chains to the provider in `createClient`.',
    '',
    'Example:',
    '',
    '```',
    "import { getDefaultProvider } from 'ethers'",
    "import { chain, createClient } from 'wagmi'",
    '',
    'createClient({',
    '  provider: Object.assign(getDefaultProvider(), { chains: [chain.mainnet] })',
    '})',
    '```',
  ].join('\n')
}

export class ResourceUnavailableError extends RpcError {
  name = 'ResourceUnavailable'

  constructor(cause: unknown) {
    super('Resource unavailable', { cause, code: -32002 })
  }
}

export class SwitchChainError extends ProviderRpcError {
  name = 'SwitchChainError'

  constructor(cause: unknown) {
    super('Error switching chain', { cause, code: 4902 })
  }
}

export class SwitchChainNotSupportedError extends Error {
  name = 'SwitchChainNotSupportedError'

  constructor({ connector }: { connector: Connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`)
  }
}

export class UserRejectedRequestError extends ProviderRpcError {
  name = 'UserRejectedRequestError'

  constructor(cause: unknown) {
    super('User rejected request', { cause, code: 4001 })
  }
}

// Ethers does not have an error type so we can use this for casting
// https://github.com/ethers-io/ethers.js/blob/main/packages/logger/src.ts/index.ts#L268
export type EthersError = Error & {
  reason: string
  code: keyof typeof Logger.errors
}
