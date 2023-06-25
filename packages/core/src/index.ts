////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectParameters,
  type ConnectReturnType,
  connect,
  // TanStack Query
  type ConnectError,
  type ConnectVariables,
  type ConnectMutationOptions,
  type ConnectMutate,
  type ConnectMutateAsync,
  connectMutationOptions,
} from './actions/connect.js'

export {
  type DisconnectParameters,
  type DisconnectError,
  disconnect,
  // TanStack Query
  type DisconnectMutationData,
  type DisconnectMutationVariables,
  type DisconnectMutationParameters,
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
  // TanStack Query
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type GetBalanceQueryParameters,
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
  // TanStack Query
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryParameters,
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

export {
  // Getter
  type GetConnectionsReturnType,
  getConnections,
  // Watcher
  type WatchConnectionsParameters,
  type WatchConnectionsReturnType,
  watchConnections,
} from './actions/getConnections.js'

export {
  type ReconnectParameters,
  type ReconnectReturnType,
  type ReconnectError,
  reconnect,
  // TanStack Query
  type ReconnectMutationData,
  type ReconnectMutationVariables,
  type ReconnectMutationParameters,
  reconnectMutationOptions,
} from './actions/reconnect.js'

export {
  type SignMessageParameters,
  type SignMessageReturnType,
  type SignMessageError,
  signMessage,
  // TanStack Query
  type SignMessageMutationData,
  type SignMessageMutationVariables,
  type SignMessageMutationParameters,
  signMessageMutationOptions,
} from './actions/signMessage.js'

export {
  type SwitchAccountParameters,
  type SwitchAccountError,
  switchAccount,
  // TanStack Query
  type SwitchAccountMutationData,
  type SwitchAccountMutationVariables,
  type SwitchAccountMutationParameters,
  switchAccountMutationOptions,
} from './actions/switchAccount.js'

export {
  type SwitchChainParameters,
  type SwitchChainReturnType,
  type SwitchChainError,
  switchChain,
  /** @deprecated */
  switchChain as switchNetwork,
  // TanStack Query
  type SwitchChainMutationData,
  type SwitchChainMutationVariables,
  type SwitchChainMutationParameters,
  switchChainMutationOptions,
} from './actions/switchChain.js'

export {
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
  // TanStack Query
  type WriteContractError,
  type WriteContractMutationVariables,
  type WriteContractMutationOptions,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  writeContractMutationOptions,
} from './actions/writeContract.js'

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
// Errors

export { BaseError } from './errors/base.js'

export {
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
} from './errors/connector.js'

export {
  ChainMismatchError,
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
} from './errors/config.js'

////////////////////////////////////////////////////////////////////////////////
// Storage

export {
  type QueryClientParameters,
  type QueryClient,
  createQueryClient,
} from './query.js'

////////////////////////////////////////////////////////////////////////////////
// Storage

export {
  type Storage,
  createStorage,
  noopStorage,
} from './storage.js'

////////////////////////////////////////////////////////////////////////////////
// Types

export {
  type OmittedQueryOptions,
  type OmittedMutationOptions,
} from './types/query.js'

export { type Register, type ResolvedRegister } from './types/register.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deserialize } from './utils/deserialize.js'

export { normalizeChainId } from './utils/normalizeChainId.js'

export { serialize } from './utils/serialize.js'
