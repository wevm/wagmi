////////////////////////////////////////////////////////////////////////////////
// Context
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type WagmiProviderProps,
  WagmiContext,
  WagmiProvider,
  /** @deprecated Use `WagmiContext` instead */
  WagmiContext as Context,
  /** @deprecated Use `WagmiProvider` instead */
  WagmiProvider as WagmiConfig,
} from '../context.js'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { type BaseErrorType, BaseError } from '../errors/base.js'

export {
  type WagmiProviderNotFoundErrorType,
  WagmiProviderNotFoundError,
} from '../errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export {
  type UseAccountParameters,
  type UseAccountReturnType,
  useAccount,
} from '../hooks/useAccount.js'

export {
  type UseAccountEffectParameters,
  useAccountEffect,
} from '../hooks/useAccountEffect.js'

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from '../hooks/useBalance.js'

export {
  type UseBlockParameters,
  type UseBlockReturnType,
  useBlock,
} from '../hooks/useBlock.js'

export {
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from '../hooks/useBlockNumber.js'

export {
  type UseBlockTransactionCountParameters,
  type UseBlockTransactionCountReturnType,
  useBlockTransactionCount,
} from '../hooks/useBlockTransactionCount.js'

export {
  type UseBytecodeParameters,
  type UseBytecodeReturnType,
  useBytecode,
} from '../hooks/useBytecode.js'

export {
  type UseCallParameters,
  type UseCallReturnType,
  useCall,
} from '../hooks/useCall.js'

export {
  type UseChainIdParameters,
  type UseChainIdReturnType,
  useChainId,
} from '../hooks/useChainId.js'

export {
  type UseChainsParameters,
  type UseChainsReturnType,
  useChains,
} from '../hooks/useChains.js'

export {
  type UseClientParameters,
  type UseClientReturnType,
  useClient,
} from '../hooks/useClient.js'

export {
  type UseConfigParameters,
  type UseConfigReturnType,
  useConfig,
} from '../hooks/useConfig.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from '../hooks/useConnect.js'

export {
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from '../hooks/useConnections.js'

export {
  type UseConnectorsParameters,
  type UseConnectorsReturnType,
  useConnectors,
} from '../hooks/useConnectors.js'

export {
  type UseConnectorClientParameters,
  type UseConnectorClientReturnType,
  useConnectorClient,
} from '../hooks/useConnectorClient.js'

export {
  type UseDeployContractParameters,
  type UseDeployContractReturnType,
  useDeployContract,
} from '../hooks/useDeployContract.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from '../hooks/useDisconnect.js'

export {
  type UseEnsAddressParameters,
  type UseEnsAddressReturnType,
  useEnsAddress,
} from '../hooks/useEnsAddress.js'

export {
  type UseEnsAvatarParameters,
  type UseEnsAvatarReturnType,
  useEnsAvatar,
} from '../hooks/useEnsAvatar.js'

export {
  type UseEnsNameParameters,
  type UseEnsNameReturnType,
  useEnsName,
} from '../hooks/useEnsName.js'

export {
  type UseEnsResolverParameters,
  type UseEnsResolverReturnType,
  useEnsResolver,
} from '../hooks/useEnsResolver.js'

export {
  type UseEnsTextParameters,
  type UseEnsTextReturnType,
  useEnsText,
} from '../hooks/useEnsText.js'

export {
  type UseEstimateFeesPerGasParameters,
  type UseEstimateFeesPerGasReturnType,
  useEstimateFeesPerGas,
  /** @deprecated Use `useEstimateFeesPerGas` instead */
  useEstimateFeesPerGas as useFeeData,
} from '../hooks/useEstimateFeesPerGas.js'

export {
  type UseEstimateGasParameters,
  type UseEstimateGasReturnType,
  useEstimateGas,
} from '../hooks/useEstimateGas.js'

export {
  type UseEstimateMaxPriorityFeePerGasParameters,
  type UseEstimateMaxPriorityFeePerGasReturnType,
  useEstimateMaxPriorityFeePerGas,
} from '../hooks/useEstimateMaxPriorityFeePerGas.js'

export {
  type UseFeeHistoryParameters,
  type UseFeeHistoryReturnType,
  useFeeHistory,
} from '../hooks/useFeeHistory.js'

export {
  type UseGasPriceParameters,
  type UseGasPriceReturnType,
  useGasPrice,
} from '../hooks/useGasPrice.js'

export {
  type UseInfiniteContractReadsParameters,
  type UseInfiniteContractReadsReturnType,
  useInfiniteReadContracts,
  /** @deprecated Use `useInfiniteReadContracts` instead */
  useInfiniteReadContracts as useContractInfiniteReads,
} from '../hooks/useInfiniteReadContracts.js'

export {
  type UsePrepareTransactionRequestParameters,
  type UsePrepareTransactionRequestReturnType,
  usePrepareTransactionRequest,
} from '../hooks/usePrepareTransactionRequest.js'

export {
  type UseProofParameters,
  type UseProofReturnType,
  useProof,
} from '../hooks/useProof.js'

export {
  type UsePublicClientParameters,
  type UsePublicClientReturnType,
  usePublicClient,
} from '../hooks/usePublicClient.js'

export {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
  /** @deprecated Use `useWriteContract` instead */
  useReadContract as useContractRead,
} from '../hooks/useReadContract.js'

export {
  type UseReadContractsParameters,
  type UseReadContractsReturnType,
  useReadContracts,
  /** @deprecated Use `useWriteContract` instead */
  useReadContracts as useContractReads,
} from '../hooks/useReadContracts.js'

export {
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from '../hooks/useReconnect.js'

export {
  type UseSendTransactionParameters,
  type UseSendTransactionReturnType,
  useSendTransaction,
} from '../hooks/useSendTransaction.js'

export {
  type UseSignMessageParameters,
  type UseSignMessageReturnType,
  useSignMessage,
} from '../hooks/useSignMessage.js'

export {
  type UseSignTypedDataParameters,
  type UseSignTypedDataReturnType,
  useSignTypedData,
} from '../hooks/useSignTypedData.js'

export {
  type UseSimulateContractParameters,
  type UseSimulateContractReturnType,
  useSimulateContract,
} from '../hooks/useSimulateContract.js'

export {
  type UseStorageAtParameters,
  type UseStorageAtReturnType,
  useStorageAt,
} from '../hooks/useStorageAt.js'

export {
  type UseSwitchAccountParameters,
  type UseSwitchAccountReturnType,
  useSwitchAccount,
} from '../hooks/useSwitchAccount.js'

export {
  type UseSwitchChainParameters,
  type UseSwitchChainReturnType,
  useSwitchChain,
} from '../hooks/useSwitchChain.js'

export {
  type UseTokenParameters,
  type UseTokenReturnType,
  /** @deprecated Use `useReadContracts` instead */
  useToken,
} from '../hooks/useToken.js'

export {
  type UseTransactionParameters,
  type UseTransactionReturnType,
  useTransaction,
} from '../hooks/useTransaction.js'

export {
  type UseTransactionConfirmationsParameters,
  type UseTransactionConfirmationsReturnType,
  useTransactionConfirmations,
} from '../hooks/useTransactionConfirmations.js'

export {
  type UseTransactionCountParameters,
  type UseTransactionCountReturnType,
  useTransactionCount,
} from '../hooks/useTransactionCount.js'

export {
  type UseTransactionReceiptParameters,
  type UseTransactionReceiptReturnType,
  useTransactionReceipt,
} from '../hooks/useTransactionReceipt.js'

export {
  type UseVerifyMessageParameters,
  type UseVerifyMessageReturnType,
  useVerifyMessage,
} from '../hooks/useVerifyMessage.js'

export {
  type UseVerifyTypedDataParameters,
  type UseVerifyTypedDataReturnType,
  useVerifyTypedData,
} from '../hooks/useVerifyTypedData.js'

export {
  type UseWalletClientParameters,
  type UseWalletClientReturnType,
  useWalletClient,
} from '../hooks/useWalletClient.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from '../hooks/useWaitForTransactionReceipt.js'

export {
  type UseWatchAssetParameters,
  type UseWatchAssetReturnType,
  useWatchAsset,
} from '../hooks/useWatchAsset.js'

export {
  type UseWatchBlocksParameters,
  type UseWatchBlocksReturnType,
  useWatchBlocks,
} from '../hooks/useWatchBlocks.js'

export {
  type UseWatchBlockNumberParameters,
  type UseWatchBlockNumberReturnType,
  useWatchBlockNumber,
} from '../hooks/useWatchBlockNumber.js'

export {
  type UseWatchContractEventParameters,
  type UseWatchContractEventReturnType,
  useWatchContractEvent,
} from '../hooks/useWatchContractEvent.js'

export {
  type UseWatchPendingTransactionsParameters,
  type UseWatchPendingTransactionsReturnType,
  useWatchPendingTransactions,
} from '../hooks/useWatchPendingTransactions.js'

export {
  type UseWriteContractParameters,
  type UseWriteContractReturnType,
  useWriteContract,
  /** @deprecated Use `useWriteContract` instead */
  useWriteContract as useContractWrite,
} from '../hooks/useWriteContract.js'

////////////////////////////////////////////////////////////////////////////////
// Hydrate
////////////////////////////////////////////////////////////////////////////////

export {
  type HydrateProps,
  Hydrate,
} from '../hydrate.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core
////////////////////////////////////////////////////////////////////////////////

export {
  // Config
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  type PartializedState,
  type State,
  createConfig,
  // Connector
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
  // Errors
  type ChainNotConfiguredErrorType,
  ChainNotConfiguredError,
  type ConnectorAlreadyConnectedErrorType,
  ConnectorAlreadyConnectedError,
  type ConnectorNotFoundErrorType,
  ConnectorNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorAccountNotFoundError,
  type ConnectorChainMismatchErrorType,
  ConnectorChainMismatchError,
  type ConnectorUnavailableReconnectingErrorType,
  ConnectorUnavailableReconnectingError,
  type ProviderNotFoundErrorType,
  ProviderNotFoundError,
  type SwitchChainNotSupportedErrorType,
  SwitchChainNotSupportedError,
  // Storage
  type CreateStorageParameters,
  type Storage,
  createStorage,
  noopStorage,
  // Transports
  custom,
  fallback,
  http,
  webSocket,
  unstable_connector,
  // Types
  type Register,
  type ResolvedRegister,
  // Utilities
  cookieStorage,
  cookieToInitialState,
  deepEqual,
  deserialize,
  normalizeChainId,
  parseCookie,
  serialize,
} from '@wagmi/core'

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from '../version.js'
