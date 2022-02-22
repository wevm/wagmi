export {
  balanceAction,
  getAccount,
  watchAccount,
  getNetwork,
  switchNetwork,
  watchNetwork,
} from './account'
export { connect, disconnect } from './connect'

export type {
  AccountResult,
  WatchAccountCallback,
  BalanceActionArgs,
  BalanceActionResult,
  NetworkResult,
  SwitchNetworkArgs,
  WatchNetworkCallback,
} from './account'
export type { ConnectResult } from './connect'
