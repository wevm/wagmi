export { getAccount, watchAccount } from './account'
export { balanceAction } from './balance'
export { connect, disconnect } from './connect'
export { getNetwork, switchNetwork, watchNetwork } from './network'

export type { AccountResult, WatchAccountCallback } from './account'
export type { BalanceActionArgs, BalanceActionResult } from './balance'
export type { ConnectResult } from './connect'
export type {
  NetworkResult,
  SwitchNetworkArgs,
  WatchNetworkCallback,
} from './network'
