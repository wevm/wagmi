////////////////////////////////////////////////////////////////////////////////
// Context

export {
  type WagmiConfigProps,
  WagmiConfig,
  WagmiContext,
} from './context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

export { useAccount } from './hooks/useAccount.js'

export {
  type UseBlockNumberParameters,
  useBlockNumber,
} from './hooks/useBlockNumber.js'

export { useConfig } from './hooks/useConfig.js'

export {
  type UseConnectParameters,
  useConnect,
} from './hooks/useConnect.js'

export {
  type UseDisconnectParameters,
  useDisconnect,
} from './hooks/useDisconnect.js'

export { useSyncExternalStoreWithTracked } from './hooks/useSyncExternalStoreWithTracked.js'

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
  deepEqual,
  deserialize,
  normalizeChainId,
  serialize,
  // Types
  type Prettify,
} from '@wagmi/core'
