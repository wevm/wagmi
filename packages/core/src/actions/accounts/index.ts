export { connect, type ConnectArgs, type ConnectResult } from './connect'

export { disconnect } from './disconnect'

export {
  fetchBalance,
  type FetchBalanceArgs,
  type FetchBalanceResult,
} from './fetchBalance'

export {
  fetchSigner,
  type FetchSignerArgs,
  type FetchSignerResult,
} from './fetchSigner'

export { getAccount, type GetAccountResult } from './getAccount'

export { getNetwork, type GetNetworkResult } from './getNetwork'

export {
  signMessage,
  type SignMessageArgs,
  type SignMessageResult,
} from './signMessage'

export {
  signTypedData,
  type SignTypedDataArgs,
  type SignTypedDataResult,
} from './signTypedData'

export {
  switchNetwork,
  type SwitchNetworkArgs,
  type SwitchNetworkResult,
} from './switchNetwork'

export { watchAccount, type WatchAccountCallback } from './watchAccount'

export { watchNetwork, type WatchNetworkCallback } from './watchNetwork'

export { watchSigner, type WatchSignerCallback } from './watchSigner'
