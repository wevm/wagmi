////////////////////////////////////////////////////////////////////////////////
// Plugin
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { configKey, WagmiPlugin, type WagmiPluginOptions } from '../plugin.js'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { BaseError, type BaseErrorType } from '../errors/base.js'

export {
  WagmiInjectionContextError,
  type WagmiInjectionContextErrorType,
  WagmiPluginNotFoundError,
  type WagmiPluginNotFoundErrorType,
} from '../errors/plugin.js'

////////////////////////////////////////////////////////////////////////////////
// Composables
////////////////////////////////////////////////////////////////////////////////

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from '../composables/useBalance.js'

export {
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from '../composables/useBlockNumber.js'

export {
  type UseBytecodeParameters,
  type UseBytecodeReturnType,
  useBytecode,
} from '../composables/useBytecode.js'

export {
  type UseChainIdParameters,
  type UseChainIdReturnType,
  useChainId,
} from '../composables/useChainId.js'

export {
  type UseChainsParameters,
  type UseChainsReturnType,
  useChains,
} from '../composables/useChains.js'

export {
  type UseClientParameters,
  type UseClientReturnType,
  useClient,
} from '../composables/useClient.js'

export {
  type UseConfigParameters,
  type UseConfigReturnType,
  useConfig,
} from '../composables/useConfig.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from '../composables/useConnect.js'

export {
  /** @deprecated use `UseConnectionParameters` instead */
  type UseConnectionParameters as UseAccountParameters,
  type UseConnectionParameters,
  /** @deprecated use `UseConnectionReturnType` instead */
  type UseConnectionReturnType as UseAccountReturnType,
  type UseConnectionReturnType,
  /** @deprecated use `useConnection` instead */
  useConnection as useAccount,
  useConnection,
} from '../composables/useConnection.js'

export {
  /** @deprecated use `UseConnectionEffectParameters` instead */
  type UseConnectionEffectParameters as UseAccountEffectParameters,
  type UseConnectionEffectParameters,
  /** @deprecated use `useConnectionEffect` instead */
  useConnectionEffect as useAccountEffect,
  useConnectionEffect,
} from '../composables/useConnectionEffect.js'

export {
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from '../composables/useConnections.js'

export {
  type UseConnectorClientParameters,
  type UseConnectorClientReturnType,
  useConnectorClient,
} from '../composables/useConnectorClient.js'

export {
  type UseConnectorsParameters,
  type UseConnectorsReturnType,
  useConnectors,
} from '../composables/useConnectors.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from '../composables/useDisconnect.js'

export {
  type UseEnsAddressParameters,
  type UseEnsAddressReturnType,
  useEnsAddress,
} from '../composables/useEnsAddress.js'

export {
  type UseEnsAvatarParameters,
  type UseEnsAvatarReturnType,
  useEnsAvatar,
} from '../composables/useEnsAvatar.js'

export {
  type UseEnsNameParameters,
  type UseEnsNameReturnType,
  useEnsName,
} from '../composables/useEnsName.js'

export {
  type UseEstimateGasParameters,
  type UseEstimateGasReturnType,
  useEstimateGas,
} from '../composables/useEstimateGas.js'

export {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
} from '../composables/useReadContract.js'

export {
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from '../composables/useReconnect.js'

export {
  type UseSendTransactionParameters,
  type UseSendTransactionReturnType,
  useSendTransaction,
} from '../composables/useSendTransaction.js'

export {
  type UseSignMessageParameters,
  type UseSignMessageReturnType,
  useSignMessage,
} from '../composables/useSignMessage.js'

export {
  type UseSignTypedDataParameters,
  type UseSignTypedDataReturnType,
  useSignTypedData,
} from '../composables/useSignTypedData.js'

export {
  type UseSimulateContractParameters,
  type UseSimulateContractReturnType,
  useSimulateContract,
} from '../composables/useSimulateContract.js'

export {
  type UseSwitchChainParameters,
  type UseSwitchChainReturnType,
  useSwitchChain,
} from '../composables/useSwitchChain.js'

export {
  /** @deprecated use `UseSwitchConnectionParameters` instead */
  type UseSwitchConnectionParameters as UseSwitchAccountParameters,
  type UseSwitchConnectionParameters,
  /** @deprecated use `UseSwitchConnectionReturnType` instead */
  type UseSwitchConnectionReturnType as UseSwitchAccountReturnType,
  type UseSwitchConnectionReturnType,
  /** @deprecated use `useSwitchConnection` instead */
  useSwitchConnection as useSwitchAccount,
  useSwitchConnection,
} from '../composables/useSwitchConnection.js'

export {
  type UseTransactionParameters,
  type UseTransactionReturnType,
  useTransaction,
} from '../composables/useTransaction.js'

export {
  type UseTransactionReceiptParameters,
  type UseTransactionReceiptReturnType,
  useTransactionReceipt,
} from '../composables/useTransactionReceipt.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from '../composables/useWaitForTransactionReceipt.js'

export {
  type UseWatchBlockNumberParameters,
  type UseWatchBlockNumberReturnType,
  useWatchBlockNumber,
} from '../composables/useWatchBlockNumber.js'

export {
  type UseWatchContractEventParameters,
  type UseWatchContractEventReturnType,
  useWatchContractEvent,
} from '../composables/useWatchContractEvent.js'

export {
  type UseWriteContractParameters,
  type UseWriteContractReturnType,
  useWriteContract,
} from '../composables/useWriteContract.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core
////////////////////////////////////////////////////////////////////////////////

export {
  ChainNotConfiguredError,
  // Errors
  type ChainNotConfiguredErrorType,
  type Config,
  // Config
  type Connection,
  type Connector,
  ConnectorAccountNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorAlreadyConnectedError,
  type ConnectorAlreadyConnectedErrorType,
  ConnectorChainMismatchError,
  type ConnectorChainMismatchErrorType,
  // Connector
  type ConnectorEventMap,
  ConnectorNotFoundError,
  type ConnectorNotFoundErrorType,
  ConnectorUnavailableReconnectingError,
  type ConnectorUnavailableReconnectingErrorType,
  type CreateConfigParameters,
  type CreateConnectorFn,
  // Storage
  type CreateStorageParameters,
  // Utilities
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createConnector,
  createStorage,
  // Transports
  custom,
  deepEqual,
  deserialize,
  fallback,
  http,
  injected,
  mock,
  noopStorage,
  type PartializedState,
  ProviderNotFoundError,
  type ProviderNotFoundErrorType,
  parseCookie,
  // Types
  type Register,
  type ResolvedRegister,
  type State,
  type Storage,
  SwitchChainNotSupportedError,
  type SwitchChainNotSupportedErrorType,
  serialize,
  unstable_connector,
  webSocket,
} from '@wagmi/core'

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from '../version.js'
