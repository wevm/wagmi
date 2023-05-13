export { mainnet, sepolia } from 'viem/chains'
export { http } from 'viem'

////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectParameters,
  type ConnectReturnType,
  connect,
  type ConnectMutationOptions,
  connectMutationOptions,
} from './actions/connect.js'

export {
  type DisconnectParameters,
  disconnect,
  type DisconnectMutationOptions,
  disconnectMutationOptions,
} from './actions/disconnect.js'

export {
  type GetAccountReturnType,
  getAccount,
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
} from './actions/getAccount.js'

export {
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryOptions,
} from './actions/getBlockNumber.js'

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
// Connectors

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from './connectors/connector.js'

export { type InjectedParameters, injected } from './connectors/injected.js'

export {
  type WalletConnectParameters,
  walletConnect,
} from './connectors/walletConnect.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter

export {
  type EventData,
  Emitter,
  createEmitter,
} from './emitter.js'

////////////////////////////////////////////////////////////////////////////////
// Errors

export {
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  ConnectorAlreadyConnectedError,
} from './errors.js'

////////////////////////////////////////////////////////////////////////////////
// Storage

export {
  type Storage,
  createStorage,
  noopStorage,
} from './storage.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deepEqual } from './utils/deepEqual.js'
