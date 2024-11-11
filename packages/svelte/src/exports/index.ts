////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type BaseErrorType,
  BaseError,
  type WagmiProviderNotFoundErrorType,
  WagmiProviderNotFoundError,
} from '../errors.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export { default as WagmiProvider } from '../WagmiProvider.svelte'

export {
  type UseAccountParameters,
  type UseAccountReturnType,
  useAccount,
} from '../hooks/useAccount.svelte.js'

export {
  type UseAccountEffectParameters,
  useAccountEffect,
} from '../hooks/useAccountEffect.svelte.js'

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from '../hooks/useBalance.svelte.js'

export {
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from '../hooks/useBlockNumber.svelte.js'

export {
  type UseChainIdParameters,
  type UseChainIdReturnType,
  useChainId,
} from '../hooks/useChainId.svelte.js'

export {
  type UseChainsParameters,
  type UseChainsReturnType,
  useChains,
} from '../hooks/useChains.svelte.js'

export {
  type UseConfigParameters,
  type UseConfigReturnType,
  useConfig,
} from '../hooks/useConfig.svelte.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from '../hooks/useConnect.svelte.js'

export {
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from '../hooks/useConnections.svelte.js'

export {
  type UseConnectorsParameters,
  type UseConnectorsReturnType,
  useConnectors,
} from '../hooks/useConnectors.svelte.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from '../hooks/useDisconnect.svelte.js'

export {
  type UseEnsAvatarParameters,
  type UseEnsAvatarReturnType,
  useEnsAvatar,
} from '../hooks/useEnsAvatar.svelte.js'

export {
  type UseEnsNameParameters,
  type UseEnsNameReturnType,
  useEnsName,
} from '../hooks/useEnsName.svelte.js'

export {
  type UseGasPriceParameters,
  type UseGasPriceReturnType,
  useGasPrice,
} from '../hooks/useGasPrice.svelte.js'

export {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
  /** @deprecated Use `useWriteContract` instead */
  useReadContract as useContractRead,
} from '../hooks/useReadContract.svelte.js'

export {
  type UseReadContractsParameters,
  type UseReadContractsReturnType,
  useReadContracts,
  /** @deprecated Use `useWriteContract` instead */
  useReadContracts as useContractReads,
} from '../hooks/useReadContracts.svelte.js'

export {
  type UseSendTransactionParameters,
  type UseSendTransactionReturnType,
  useSendTransaction,
} from '../hooks/useSendTransaction.svelte.js'

export {
  type UseSignMessageParameters,
  type UseSignMessageReturnType,
  useSignMessage,
} from '../hooks/useSignMessage.svelte.js'

export {
  type UseSwitchAccountParameters,
  type UseSwitchAccountReturnType,
  useSwitchAccount,
} from '../hooks/useSwitchAccount.svelte.js'

export {
  type UseSwitchChainParameters,
  type UseSwitchChainReturnType,
  useSwitchChain,
} from '../hooks/useSwitchChain.svelte.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from '../hooks/useWaitForTransactionReceipt.svelte.js'

export {
  type UseWatchBlockNumberParameters,
  type UseWatchBlockNumberReturnType,
  useWatchBlockNumber,
} from '../hooks/useWatchBlockNumber.svelte.js'

export {
  type UseWriteContractParameters,
  type UseWriteContractReturnType,
  useWriteContract,
  /** @deprecated Use `useWriteContract` instead */
  useWriteContract as useContractWrite,
} from '../hooks/useWriteContract.svelte.js'

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
  type Transport,
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
