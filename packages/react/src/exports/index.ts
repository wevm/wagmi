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
// Context

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

export { BaseError } from '../errors/base.js'

export { WagmiProviderNotFoundError } from '../errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

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
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from '../hooks/useBlockNumber.js'

export {
  type UseChainIdParameters,
  type UseChainIdReturnType,
  useChainId,
} from '../hooks/useChainId.js'

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
  type UseConnectorClientParameters,
  type UseConnectorClientReturnType,
  useConnectorClient,
} from '../hooks/useConnectorClient.js'

export {
  type UseContractReadParameters,
  type UseContractReadReturnType,
  useContractRead,
} from '../hooks/useContractRead.js'

export {
  type UseContractReadsParameters,
  type UseContractReadsReturnType,
  useContractReads,
} from '../hooks/useContractReads.js'

export {
  type UseContractWriteParameters,
  type UseContractWriteReturnType,
  useContractWrite,
} from '../hooks/useContractWrite.js'

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
  type UseEstimateGasParameters,
  type UseEstimateGasReturnType,
  useEstimateGas,
} from '../hooks/useEstimateGas.js'

export {
  type UseFeeDataParameters,
  type UseFeeDataReturnType,
  useFeeData,
} from '../hooks/useFeeData.js'

export {
  type UseContractSimulateParameters,
  type UseContractSimulateReturnType,
  useContractSimulate,
} from '../hooks/useContractSimulate.js'

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
  useToken,
} from '../hooks/useToken.js'

export {
  type UseTransactionParameters,
  type UseTransactionReturnType,
  useTransaction,
} from '../hooks/useTransaction.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from '../hooks/useWaitForTransactionReceipt.js'

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

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core

export {
  // Config
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  type State,
  createConfig,
  // Connector
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
  // Errors
  ChainMismatchError,
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ConnectorAccountNotFound,
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
  // Storage
  type CreateStorageParameters,
  type Storage,
  createStorage,
  noopStorage,
  // Types
  type Register,
  type ResolvedRegister,
  // Utilities
  deserialize,
  normalizeChainId,
  serialize,
} from '@wagmi/core'

////////////////////////////////////////////////////////////////////////////////
// Version

export { version } from '../version.js'
