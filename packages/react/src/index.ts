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
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from './hooks/useReconnect.js'

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
  /** @deprecated */
  useSwitchChain as useSwitchNetwork,
} from './hooks/useSwitchChain.js'

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
  // Query
  type QueryClientParameters,
  type QueryClient,
  createQueryClient,
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
