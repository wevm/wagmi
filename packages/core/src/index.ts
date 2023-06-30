////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectError,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from './actions/connect.js'

export {
  type DisconnectError,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
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
} from './actions/getBalance.js'

export {
  // Getter
  type GetBlockNumberError,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
  // Watcher
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
} from './actions/getBlockNumber.js'

export {
  type GetEnsAddressError,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from './actions/getEnsAddress.js'

export {
  type GetEnsAvatarError,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from './actions/getEnsAvatar.js'

export {
  type GetEnsNameError,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from './actions/getEnsName.js'

export {
  type GetEnsResolverError,
  type GetEnsResolverParameters,
  type GetEnsResolverReturnType,
  getEnsResolver,
} from './actions/getEnsResolver.js'

export {
  type GetFeeDataError,
  type GetFeeDataParameters,
  type GetFeeDataReturnType,
  getFeeData,
} from './actions/getFeeData.js'

export {
  type GetTokenError,
  type GetTokenParameters,
  type GetTokenReturnType,
  getToken,
} from './actions/getToken.js'

export {
  type GetTransactionError,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from './actions/getTransaction.js'

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
  type PrepareSendTransactionError,
  type PrepareSendTransactionParameters,
  type PrepareSendTransactionReturnType,
  prepareSendTransaction,
} from './actions/prepareSendTransaction.js'

export {
  type ReconnectError,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from './actions/reconnect.js'

export {
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from './actions/signMessage.js'

export {
  type SwitchAccountError,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from './actions/switchAccount.js'

export {
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from './actions/switchChain.js'

export {
  type WaitForTransactionReceiptError,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from './actions/waitForTransactionReceipt.js'

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
  type Storage,
  createStorage,
  noopStorage,
} from './storage.js'

////////////////////////////////////////////////////////////////////////////////
// Types

export { type Register, type ResolvedRegister } from './types/register.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deserialize } from './utils/deserialize.js'

export { normalizeChainId } from './utils/normalizeChainId.js'

export { serialize } from './utils/serialize.js'
