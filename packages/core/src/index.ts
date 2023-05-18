////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectParameters,
  type ConnectReturnType,
  type ConnectError,
  connect,
  // Mutation
  type ConnectMutationData,
  type ConnectMutationVariables,
  type ConnectMutationOptions,
  connectMutationOptions,
} from './actions/connect.js'

export {
  type DisconnectParameters,
  type DisconnectError,
  disconnect,
  // Mutation
  type DisconnectMutationData,
  type DisconnectMutationVariables,
  type DisconnectMutationOptions,
  disconnectMutationOptions,
} from './actions/disconnect.js'

export {
  // Getter
  type GetAccountReturnType,
  getAccount,
  // Watcher
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
} from './actions/getAccount.js'

export {
  // Getter
  type GetBalanceParameters,
  type GetBalanceReturnType,
  type GetBalanceError,
  getBalance,
  // Watcher
  type WatchBalanceParameters,
  type WatchBalanceReturnType,
  watchBalance,
  // Query
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type GetBalanceQueryOptions,
  getBalanceQueryOptions,
} from './actions/getBalance.js'

export {
  // Getter
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  type GetBlockNumberError,
  getBlockNumber,
  // Watcher
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
  // Query
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryOptions,
} from './actions/getBlockNumber.js'

export {
  // Getter
  type GetChainIdReturnType,
  getChainId,
  // Watcher
  type WatchChainIdParameters,
  type WatchChainIdReturnType,
  watchChainId,
} from './actions/getChainId.js'

////////////////////////////////////////////////////////////////////////////////
// Chain

export { type Chain } from './chain.js'

////////////////////////////////////////////////////////////////////////////////
// Config

export {
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  createConfig,
} from './config.js'

////////////////////////////////////////////////////////////////////////////////
// Connector

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from './connector.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter

export {
  type EventData,
  Emitter,
  createEmitter,
} from './emitter.js'

////////////////////////////////////////////////////////////////////////////////
// Errors

export { BaseError } from './errors/base.js'

export { ProviderNotFoundError } from './errors/connector.js'

export {
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
} from './errors/config.js'

////////////////////////////////////////////////////////////////////////////////
// Storage

export {
  type Storage,
  createStorage,
  noopStorage,
} from './storage.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deserialize } from './utils/deserialize.js'

export { normalizeChainId } from './utils/normalizeChainId.js'

export { serialize } from './utils/serialize.js'
