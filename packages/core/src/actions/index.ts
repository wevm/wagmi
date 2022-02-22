export { balanceAction, getAccount, watchAccount } from './account'
export { connect, disconnect } from './connect'
export { getNetwork, switchNetwork, watchNetwork } from './network'

export type {
  AccountResult,
  WatchAccountCallback,
  BalanceActionArgs,
  BalanceActionResult,
} from './account'
export type { ConnectResult } from './connect'
export type {
  NetworkResult,
  SwitchNetworkArgs,
  WatchNetworkCallback,
} from './network'
