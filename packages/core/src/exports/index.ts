////////////////////////////////////////////////////////////////////////////////
// Viem

// extremely commonly used viem exports
export {
  custom,
  fallback,
  http,
  webSocket,
} from 'viem'

////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectError,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from '../actions/connect.js'

export {
  type DisconnectError,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
} from '../actions/disconnect.js'

export {
  type EstimateGasError,
  type EstimateGasParameters,
  type EstimateGasReturnType,
  estimateGas,
} from '../actions/estimateGas.js'

export {
  type GetAccountReturnType,
  getAccount,
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
} from '../actions/getAccount.js'

export {
  type GetBalanceParameters,
  type GetBalanceReturnType,
  type GetBalanceError,
  getBalance,
} from '../actions/getBalance.js'

export {
  type GetBlockNumberError,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
} from '../actions/getBlockNumber.js'

export {
  type GetChainIdReturnType,
  getChainId,
  type WatchChainIdParameters,
  type WatchChainIdReturnType,
  watchChainId,
} from '../actions/getChainId.js'

export {
  type GetConnectionsReturnType,
  getConnections,
  type WatchConnectionsParameters,
  type WatchConnectionsReturnType,
  watchConnections,
} from '../actions/getConnections.js'

export {
  type GetConnectorClientError,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from '../actions/getConnectorClient.js'

export {
  type GetEnsAddressError,
  type GetEnsAddressParameters,
  type GetEnsAddressReturnType,
  getEnsAddress,
} from '../actions/getEnsAddress.js'

export {
  type GetEnsAvatarError,
  type GetEnsAvatarParameters,
  type GetEnsAvatarReturnType,
  getEnsAvatar,
} from '../actions/getEnsAvatar.js'

export {
  type GetEnsNameError,
  type GetEnsNameParameters,
  type GetEnsNameReturnType,
  getEnsName,
} from '../actions/getEnsName.js'

export {
  type GetEnsResolverError,
  type GetEnsResolverParameters,
  type GetEnsResolverReturnType,
  getEnsResolver,
} from '../actions/getEnsResolver.js'

export {
  type GetFeeDataError,
  type GetFeeDataParameters,
  type GetFeeDataReturnType,
  getFeeData,
} from '../actions/getFeeData.js'

export {
  type GetTokenError,
  type GetTokenParameters,
  type GetTokenReturnType,
  getToken,
} from '../actions/getToken.js'

export {
  type GetTransactionError,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'

export {
  type MulticallParameters,
  type MulticallReturnType,
  multicall,
} from '../actions/multicall.js'

export {
  type ReadContractParameters,
  type ReadContractReturnType,
  type ReadContractError,
  readContract,
} from '../actions/readContract.js'

export {
  type ReadContractsParameters,
  type ReadContractsReturnType,
  type ReadContractsError,
  readContracts,
} from '../actions/readContracts.js'

export {
  type ReconnectError,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from '../actions/reconnect.js'

export {
  type SendTransactionError,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'

export {
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from '../actions/signMessage.js'

export {
  type SignTypedDataError,
  type SignTypedDataParameters,
  type SignTypedDataReturnType,
  signTypedData,
} from '../actions/signTypedData.js'

export {
  type SimulateContractError,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from '../actions/simulateContract.js'

export {
  type SwitchAccountError,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from '../actions/switchAccount.js'

export {
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '../actions/switchChain.js'

export {
  type WatchContractEventParameters,
  type WatchContractEventReturnType,
  watchContractEvent,
} from '../actions/watchContractEvent.js'

export {
  type WatchPendingTransactionsParameters,
  type WatchPendingTransactionsReturnType,
  watchPendingTransactions,
} from '../actions/watchPendingTransactions.js'

export {
  type WaitForTransactionReceiptError,
  type WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt,
} from '../actions/waitForTransactionReceipt.js'

export {
  type WriteContractError,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'

////////////////////////////////////////////////////////////////////////////////
// createConfig

export {
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  type State,
  createConfig,
} from '../createConfig.js'

////////////////////////////////////////////////////////////////////////////////
// createConnector

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from '../createConnector.js'

////////////////////////////////////////////////////////////////////////////////
// createStorage

export {
  type CreateStorageParameters,
  type Storage,
  type StorageItemMap,
  createStorage,
  noopStorage,
} from '../createStorage.js'

////////////////////////////////////////////////////////////////////////////////
// Errors

export { BaseError } from '../errors/base.js'

export {
  ChainMismatchError,
  ChainNotConfiguredError,
  ConnectorNotConnectedError,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ConnectorAccountNotFound,
} from '../errors/config.js'

export {
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
} from '../errors/connector.js'

////////////////////////////////////////////////////////////////////////////////
// Types

export { type Register, type ResolvedRegister } from '../types/register.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deserialize } from '../utils/deserialize.js'

export { normalizeChainId } from '../utils/normalizeChainId.js'

export { serialize } from '../utils/serialize.js'

////////////////////////////////////////////////////////////////////////////////
// Version

export { version } from '../version.js'
