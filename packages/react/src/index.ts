////////////////////////////////////////////////////////////////////////////////
// Context

export {
  type WagmiConfigProps,
  WagmiConfig,
  WagmiContext,
} from './context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

export { BaseError } from './errors/base.js'

export { WagmiConfigNotFoundError } from './errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

export { useAccount } from './hooks/useAccount.js'

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from './hooks/useBalance.js'

export {
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from './hooks/useBlockNumber.js'

export { useConfig } from './hooks/useConfig.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from './hooks/useConnect.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from './hooks/useDisconnect.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core

export {
  // Chain
  type Chain,
  // Config
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  createConfig,
  // Connector
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
  // Emitter
  type EventData,
  Emitter,
  createEmitter,
  // Errors
  ChainNotConfiguredError,
  ProviderNotFoundError,
  ConnectorAlreadyConnectedError,
  // Storage
  type Storage,
  createStorage,
  noopStorage,
  // Utilities
  deserialize,
  normalizeChainId,
  serialize,
} from '@wagmi/core'
