export { Connector, InjectedConnector } from './connectors'
export type { ConnectorData, ConnectorEvents } from './connectors'

export {
  balanceAction,
  connect,
  disconnect,
  fetchEnsName,
  getAccount,
  getNetwork,
  signMessage,
  switchNetwork,
  writeContract,
  watchAccount,
  watchContractEvent,
  watchNetwork,
} from './actions'
export type {
  GetAccountResult,
  BalanceActionArgs,
  BalanceActionResult,
  ConnectResult,
  FetchEnsNameArgs,
  FetchEnsNameResult,
  GetNetworkResult,
  SignMessageArgs,
  SignMessageResult,
  SwitchNetworkArgs,
  WatchAccountCallback,
  WatchNetworkCallback,
} from './actions'

export {
  erc1155ABI,
  erc20ABI,
  erc721ABI,
  chain,
  allChains,
  defaultChains,
  defaultL2Chains,
  developmentChains,
  units,
} from './constants'

export {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from './errors'

export { createWagmiClient } from './client'
export type { WagmiClient, WagmiClientConfig } from './client'

export type { Balance, Chain, Unit } from './types'

export { normalizeChainId, createStorage } from './utils'
export type { WagmiStorage } from './utils'
