////////////////////////////////////////////////////////////////////////////////
// Context
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  WagmiContext,
  WagmiProvider,
  type WagmiProviderProps,
} from '../context.js'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { BaseError, type BaseErrorType } from '../errors/base.js'

export {
  WagmiProviderNotFoundError,
  type WagmiProviderNotFoundErrorType,
} from '../errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Primitives
////////////////////////////////////////////////////////////////////////////////

export { useBalance } from '../primitives/useBalance.js'

export { useBlockNumber } from '../primitives/useBlockNumber.js'

export { useInfiniteReadContracts } from '../primitives/useInfiniteReadContracts.js'

export { useChainId } from '../primitives/useChainId.js'

export { useChains } from '../primitives/useChains.js'

export { useClient } from '../primitives/useClient.js'

export { useConfig } from '../primitives/useConfig.js'

export { useConnect } from '../primitives/useConnect.js'

export { useConnection } from '../primitives/useConnection.js'

export { useConnectionEffect } from '../primitives/useConnectionEffect.js'

export { useConnections } from '../primitives/useConnections.js'

export { useConnectorClient } from '../primitives/useConnectorClient.js'

export { useConnectors } from '../primitives/useConnectors.js'

export { useDisconnect } from '../primitives/useDisconnect.js'

export { useReadContract } from '../primitives/useReadContract.js'

export { useReadContracts } from '../primitives/useReadContracts.js'

export { useReconnect } from '../primitives/useReconnect.js'

export { useSwitchChain } from '../primitives/useSwitchChain.js'

export { useSimulateContract } from '../primitives/useSimulateContract.js'

export { useSwitchConnection } from '../primitives/useSwitchConnection.js'

export { useWatchBlockNumber } from '../primitives/useWatchBlockNumber.js'

export { useWatchContractEvent } from '../primitives/useWatchContractEvent.js'

export { useWriteContract } from '../primitives/useWriteContract.js'

export { useWriteContractSync } from '../primitives/useWriteContractSync.js'

////////////////////////////////////////////////////////////////////////////////
// Hydrate
////////////////////////////////////////////////////////////////////////////////

export {
  Hydrate,
  type HydrateProps,
} from '../hydrate.js'

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
  type Transport,
  unstable_connector,
  webSocket,
} from '@wagmi/core'

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from '../version.js'
