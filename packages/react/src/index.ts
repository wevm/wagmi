////////////////////////////////////////////////////////////////////////////////
// Context

export {
  type WagmiConfigProps,
  WagmiConfig,
  WagmiContext,
  /** @deprecated Use `WagmiContext` instead */
  WagmiContext as Context,
} from './context.js'

////////////////////////////////////////////////////////////////////////////////
// Errors

export { BaseError } from './errors/base.js'

export { WagmiConfigNotFoundError } from './errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

export { type UseAccountReturnType, useAccount } from './hooks/useAccount.js'

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from './hooks/useBalance.js'

export {
  type UseBlockNumberParameters,
  type UseBlockNumberReturnType,
  useBlockNumber,
} from './hooks/useBlockNumber.js'

export { type UseChainIdReturnType, useChainId } from './hooks/useChainId.js'

export { type UseConfigReturnType, useConfig } from './hooks/useConfig.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from './hooks/useConnect.js'

export {
  type UseConnectionsReturnType,
  useConnections,
} from './hooks/useConnections.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from './hooks/useDisconnect.js'

export {
  type UseEnsAddressParameters,
  type UseEnsAddressReturnType,
  useEnsAddress,
} from './hooks/useEnsAddress.js'

export {
  type UseEnsAvatarParameters,
  type UseEnsAvatarReturnType,
  useEnsAvatar,
} from './hooks/useEnsAvatar.js'

export {
  type UseEnsNameParameters,
  type UseEnsNameReturnType,
  useEnsName,
} from './hooks/useEnsName.js'

export {
  type UseEnsResolverParameters,
  type UseEnsResolverReturnType,
  useEnsResolver,
} from './hooks/useEnsResolver.js'

export {
  type UseFeeDataParameters,
  type UseFeeDataReturnType,
  useFeeData,
} from './hooks/useFeeData.js'

export {
  type UsePrepareSendTransactionParameters,
  type UsePrepareSendTransactionReturnType,
  usePrepareSendTransaction,
} from './hooks/usePrepareSendTransaction.js'

export {
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from './hooks/useReconnect.js'

export {
  type UseSendTransactionParameters,
  type UseSendTransactionReturnType,
  useSendTransaction,
} from './hooks/useSendTransaction.js'

export {
  type UseSignMessageParameters,
  type UseSignMessageReturnType,
  useSignMessage,
} from './hooks/useSignMessage.js'

export {
  type UseSwitchAccountParameters,
  type UseSwitchAccountReturnType,
  useSwitchAccount,
} from './hooks/useSwitchAccount.js'

export {
  type UseSwitchChainParameters,
  type UseSwitchChainReturnType,
  useSwitchChain,
} from './hooks/useSwitchChain.js'

export {
  type UseTokenParameters,
  type UseTokenReturnType,
  useToken,
} from './hooks/useToken.js'

export {
  type UseTransactionParameters,
  type UseTransactionReturnType,
  useTransaction,
} from './hooks/useTransaction.js'

export {
  type UseWaitForTransactionReceiptParameters,
  type UseWaitForTransactionReceiptReturnType,
  useWaitForTransactionReceipt,
} from './hooks/useWaitForTransactionReceipt.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core

export {
  // Config
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  createConfig,
  // Connector
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
  // Errors
  ChainNotConfiguredError,
  ProviderNotFoundError,
  ConnectorAlreadyConnectedError,
  // Storage
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
