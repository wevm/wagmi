////////////////////////////////////////////////////////////////////////////////
// Plugin
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { configKey, type WagmiPluginOptions, WagmiPlugin } from '../plugin.js'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { type BaseErrorType, BaseError } from '../errors/base.js'

export {
  type WagmiPluginNotFoundErrorType,
  WagmiPluginNotFoundError,
  type WagmiInjectionContextErrorType,
  WagmiInjectionContextError,
} from '../errors/plugin.js'

////////////////////////////////////////////////////////////////////////////////
// Composables
////////////////////////////////////////////////////////////////////////////////

export {
  type UseAccountParameters,
  type UseAccountReturnType,
  useAccount,
} from '../composables/useAccount.js'

export {
  type UseAccountEffectParameters,
  useAccountEffect,
} from '../composables/useAccountEffect.js'

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
  type UseChainIdParameters,
  type UseChainIdReturnType,
  useChainId,
} from '../composables/useChainId.js'

export {
  type UseClientParameters,
  type UseClientReturnType,
  useClient,
} from '../composables/useClient.js'

export {
  type UseConnectorClientParameters,
  type UseConnectorClientReturnType,
  useConnectorClient,
} from '../composables/useConnectorClient.js'

export {
  type UseChainsParameters,
  type UseChainsReturnType,
  useChains,
} from '../composables/useChains.js'

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
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from '../composables/useConnections.js'

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
  type UseSwitchAccountParameters,
  type UseSwitchAccountReturnType,
  useSwitchAccount,
} from '../composables/useSwitchAccount.js'

export {
  type UseSwitchChainParameters,
  type UseSwitchChainReturnType,
  useSwitchChain,
} from '../composables/useSwitchChain.js'

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
  type UseWatchBlockNumberParameters,
  type UseWatchBlockNumberReturnType,
  useWatchBlockNumber,
} from '../composables/useWatchBlockNumber.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from '../composables/useWaitForTransactionReceipt.js'

export {
  type UseWriteContractParameters,
  type UseWriteContractReturnType,
  useWriteContract,
} from '../composables/useWriteContract.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core
////////////////////////////////////////////////////////////////////////////////

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
