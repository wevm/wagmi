////////////////////////////////////////////////////////////////////////////////
// Context

export {
  type WagmiConfigProps,
  WagmiConfig,
  useConfig,
  WagmiContext,
} from './context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks

export { useAccount } from './hooks/useAccount.js'

export {
  type UseBlockNumberParameters,
  useBlockNumber,
} from './hooks/useBlockNumber.js'

export {
  type UseConnectParameters,
  useConnect,
} from './hooks/useConnect.js'

export {
  type UseDisconnectParameters,
  useDisconnect,
} from './hooks/useDisconnect.js'

export { useSyncExternalStoreWithTracked } from './hooks/useSyncExternalStoreWithTracked.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/core

export {
  type Chain,
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  createConfig,
} from '@wagmi/core'
