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
  type EstimateFeesPerGasError,
  type EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType,
  estimateFeesPerGas,
} from '../actions/estimateFeesPerGas.js'

export {
  type GetAccountReturnType,
  getAccount,
} from '../actions/getAccount.js'

export {
  type GetBalanceParameters,
  type GetBalanceReturnType,
  type GetBalanceError,
  getBalance,
} from '../actions/getBalance.js'

export {
  type GetBlockError,
  type GetBlockParameters,
  type GetBlockReturnType,
  getBlock,
} from '../actions/getBlock.js'

export {
  type GetBlockNumberError,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from '../actions/getBlockNumber.js'

export {
  type GetChainIdReturnType,
  getChainId,
} from '../actions/getChainId.js'

export {
  type GetClientParameters,
  type GetClientReturnType,
  getClient,
} from '../actions/getClient.js'

export {
  type GetConnectionsReturnType,
  getConnections,
} from '../actions/getConnections.js'

export {
  type GetConnectorsReturnType,
  getConnectors,
} from '../actions/getConnectors.js'

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
  type GetPublicClientParameters,
  type GetPublicClientReturnType,
  getPublicClient,
} from '../actions/getPublicClient.js'

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
  type GetWalletClientError,
  type GetWalletClientParameters,
  type GetWalletClientReturnType,
  getWalletClient,
} from '../actions/getWalletClient.js'

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
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
} from '../actions/watchAccount.js'

export {
  type WatchBlocksParameters,
  type WatchBlocksReturnType,
  watchBlocks,
} from '../actions/watchBlocks.js'

export {
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
} from '../actions/watchBlockNumber.js'

export {
  type WatchChainIdParameters,
  type WatchChainIdReturnType,
  watchChainId,
} from '../actions/watchChainId.js'

export {
  type WatchClientParameters,
  type WatchClientReturnType,
  watchClient,
} from '../actions/watchClient.js'

export {
  type WatchConnectionsParameters,
  type WatchConnectionsReturnType,
  watchConnections,
} from '../actions/watchConnections.js'

export {
  type WatchConnectorsParameters,
  type WatchConnectorsReturnType,
  watchConnectors,
} from '../actions/watchConnectors.js'

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
  type WatchPublicClientParameters,
  type WatchPublicClientReturnType,
  watchPublicClient,
} from '../actions/watchPublicClient.js'

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
// connectors

export {
  type InjectedParameters,
  injected,
} from '../connectors/injected.js'

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from '../connectors/createConnector.js'

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
