////////////////////////////////////////////////////////////////////////////////
// Context
////////////////////////////////////////////////////////////////////////////////

export {
  type WagmiProviderProps,
  WagmiProvider,
  /** @deprecated Use `WagmiProvider` instead */
  WagmiProvider as WagmiConfig,
} from '../context.tsx'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { type BaseErrorType, BaseError } from '../errors/base.js'

export {
  type WagmiProviderNotFoundErrorType,
  WagmiProviderNotFoundError,
} from '../errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// signals
////////////////////////////////////////////////////////////////////////////////

export {
  type CreateAccountParameters,
  type CreateAccountReturnType,
  createAccount,
} from '../signals/createAccount.ts'

export {
  type CreateAccountEffectParameters,
  createAccountEffect,
} from '../signals/createAccountEffect.js'

// export {
//   typ../signals/createAccountEffect.ts
//   type UseBalanceReturnType,
//   useBalance,
// } from '../signals/useBalance.js'

// export {
//   type UseBlockParameters,
//   type UseBlockReturnType,
//   useBlock,
// } from '../signals/useBlock.js'

// export {
//   type UseBlockNumberParameters,
//   type UseBlockNumberReturnType,
//   useBlockNumber,
// } from '../signals/useBlockNumber.js'

// export {
//   type UseBlockTransactionCountParameters,
//   type UseBlockTransactionCountReturnType,
//   useBlockTransactionCount,
// } from '../signals/useBlockTransactionCount.js'

// export {
//   type UseBytecodeParameters,
//   type UseBytecodeReturnType,
//   useBytecode,
// } from '../signals/useBytecode.js'

// export {
//   type UseCallParameters,
//   type UseCallReturnType,
//   useCall,
// } from '../signals/useCall.js'

export {
  type CreateChainIdParameters,
  type CreateChainIdReturnType,
  createChainId,
} from '../signals/createChainId.ts'

export {
  type CreateClientParameters,
  type CreateClientReturnType,
  createClient,
} from '../signals/createClient.js'

export {
  type CreateConfigParameters,
  type CreateConfigReturnType,
  createConfig,
} from '../signals/createConfig.ts'

export {
  type CreateConnectParameters,
  type CreateConnectReturnType,
  createConnect
} from '../signals/createConnect.js'

export {
  type CreateConnectionsParameters,
  type CreateConnectionsReturnType,
  createConnections,
} from '../signals/createConnections.js'

export {
  type CreateConnectorsParameters,
  type CreateConnectorsReturnType,
  createConnectors,
} from '../signals/createConnectors.js'

export {
  type CreateConnectorClientParameters,
  type CreateConnectorClientReturnType,
  createConnectorClient,
} from '../signals/createConnectorClient.ts'

export {
  type CreateDisconnectParameters,
  type CreateDisconnectReturnType,
  createDisconnect,
} from '../signals/createDisconnect.js'

// export {
//   typ../signals/createDisconnect.ts
//   type UseEnsAddressReturnType,
//   useEnsAddress,
// } from '../signals/useEnsAddress.js'

// export {
//   type UseEnsAvatarParameters,
//   type UseEnsAvatarReturnType,
//   useEnsAvatar,
// } from '../signals/useEnsAvatar.js'

// export {
//   type UseEnsNameParameters,
//   type UseEnsNameReturnType,
//   useEnsName,
// } from '../signals/useEnsName.js'

// export {
//   type UseEnsResolverParameters,
//   type UseEnsResolverReturnType,
//   useEnsResolver,
// } from '../signals/useEnsResolver.js'

// export {
//   type UseEnsTextParameters,
//   type UseEnsTextReturnType,
//   useEnsText,
// } from '../signals/useEnsText.js'

// export {
//   type UseEstimateFeesPerGasParameters,
//   type UseEstimateFeesPerGasReturnType,
//   useEstimateFeesPerGas,
//   /** @deprecated Use `useEstimateFeesPerGas` instead */
//   useEstimateFeesPerGas as useFeeData,
// } from '../signals/useEstimateFeesPerGas.js'

// export {
//   type UseEstimateGasParameters,
//   type UseEstimateGasReturnType,
//   useEstimateGas,
// } from '../signals/useEstimateGas.js'

// export {
//   type UseEstimateMaxPriorityFeePerGasParameters,
//   type UseEstimateMaxPriorityFeePerGasReturnType,
//   useEstimateMaxPriorityFeePerGas,
// } from '../signals/useEstimateMaxPriorityFeePerGas.js'

// export {
//   type UseFeeHistoryParameters,
//   type UseFeeHistoryReturnType,
//   useFeeHistory,
// } from '../signals/useFeeHistory.js'

// export {
//   type UseGasPriceParameters,
//   type UseGasPriceReturnType,
//   useGasPrice,
// } from '../signals/useGasPrice.js'

// export {
//   type UseInfiniteContractReadsParameters,
//   type UseInfiniteContractReadsReturnType,
//   useInfiniteReadContracts,
//   /** @deprecated Use `useInfiniteReadContracts` instead */
//   useInfiniteReadContracts as useContractInfiniteReads,
// } from '../signals/useInfiniteReadContracts.js'

// export {
//   type UsePrepareTransactionRequestParameters,
//   type UsePrepareTransactionRequestReturnType,
//   usePrepareTransactionRequest,
// } from '../signals/usePrepareTransactionRequest.js'

// export {
//   type UseProofParameters,
//   type UseProofReturnType,
//   useProof,
// } from '../signals/useProof.js'

// export {
//   type UsePublicClientParameters,
//   type UsePublicClientReturnType,
//   usePublicClient,
// } from '../signals/usePublicClient.js'

// export {
//   type UseReadContractParameters,
//   type UseReadContractReturnType,
//   useReadContract,
//   /** @deprecated Use `useWriteContract` instead */
//   useReadContract as useContractRead,
// } from '../signals/useReadContract.js'

// export {
//   type UseReadContractsParameters,
//   type UseReadContractsReturnType,
//   useReadContracts,
//   /** @deprecated Use `useWriteContract` instead */
//   useReadContracts as useContractReads,
// } from '../signals/useReadContracts.js'

// export {
//   type UseReconnectParameters,
//   type UseReconnectReturnType,
//   useReconnect,
// } from '../signals/useReconnect.js'

// export {
//   type UseSendTransactionParameters,
//   type UseSendTransactionReturnType,
//   useSendTransaction,
// } from '../signals/useSendTransaction.js'

// export {
//   type UseSignMessageParameters,
//   type UseSignMessageReturnType,
//   useSignMessage,
// } from '../signals/useSignMessage.js'

// export {
//   type UseSignTypedDataParameters,
//   type UseSignTypedDataReturnType,
//   useSignTypedData,
// } from '../signals/useSignTypedData.js'

// export {
//   type UseSimulateContractParameters,
//   type UseSimulateContractReturnType,
//   useSimulateContract,
// } from '../signals/useSimulateContract.js'

// export {
//   type UseStorageAtParameters,
//   type UseStorageAtReturnType,
//   useStorageAt,
// } from '../signals/useStorageAt.js'

// export {
//   type UseSwitchAccountParameters,
//   type UseSwitchAccountReturnType,
//   useSwitchAccount,
// } from '../signals/useSwitchAccount.js'

// export {
//   type UseSwitchChainParameters,
//   type UseSwitchChainReturnType,
//   useSwitchChain,
// } from '../signals/useSwitchChain.js'

// export {
//   type UseTokenParameters,
//   type UseTokenReturnType,
//   /** @deprecated Use `useReadContracts` instead */
//   useToken,
// } from '../signals/useToken.js'

// export {
//   type UseTransactionParameters,
//   type UseTransactionReturnType,
//   useTransaction,
// } from '../signals/useTransaction.js'

// export {
//   type UseTransactionConfirmationsParameters,
//   type UseTransactionConfirmationsReturnType,
//   useTransactionConfirmations,
// } from '../signals/useTransactionConfirmations.js'

// export {
//   type UseTransactionCountParameters,
//   type UseTransactionCountReturnType,
//   useTransactionCount,
// } from '../signals/useTransactionCount.js'

// export {
//   type UseTransactionReceiptParameters,
//   type UseTransactionReceiptReturnType,
//   useTransactionReceipt,
// } from '../signals/useTransactionReceipt.js'

// export {
//   type UseVerifyMessageParameters,
//   type UseVerifyMessageReturnType,
//   useVerifyMessage,
// } from '../signals/useVerifyMessage.js'

// export {
//   type UseVerifyTypedDataParameters,
//   type UseVerifyTypedDataReturnType,
//   useVerifyTypedData,
// } from '../signals/useVerifyTypedData.js'

// export {
//   type UseWalletClientParameters,
//   type UseWalletClientReturnType,
//   useWalletClient,
// } from '../signals/useWalletClient.js'

// export {
//   type UseWaitForTransactionReceiptParameters,
//   type UseWaitForTransactionReceiptReturnType,
//   useWaitForTransactionReceipt,
// } from '../signals/useWaitForTransactionReceipt.js'

// export {
//   type UseWatchBlocksParameters,
//   type UseWatchBlocksReturnType,
//   useWatchBlocks,
// } from '../signals/useWatchBlocks.js'

// export {
//   type UseWatchBlockNumberParameters,
//   type UseWatchBlockNumberReturnType,
//   useWatchBlockNumber,
// } from '../signals/useWatchBlockNumber.js'

// export {
//   type UseWatchContractEventParameters,
//   type UseWatchContractEventReturnType,
//   useWatchContractEvent,
// } from '../signals/useWatchContractEvent.js'

// export {
//   type UseWatchPendingTransactionsParameters,
//   type UseWatchPendingTransactionsReturnType,
//   useWatchPendingTransactions,
// } from '../signals/useWatchPendingTransactions.js'

// export {
//   type UseWriteContractParameters,
//   type UseWriteContractReturnType,
//   useWriteContract,
//   /** @deprecated Use `useWriteContract` instead */
//   useWriteContract as useContractWrite,
// } from '../signals/useWriteContract.js'

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
  type CreateConfigParameters as InitConfigParameters,
  type State,
  createConfig as initConfig,
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
