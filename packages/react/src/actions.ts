////////////////////////////////////////////////////////////////////////////////
// @wagmi/core actions

export {
  // connect
  type ConnectError,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
  // disconnect
  type DisconnectError,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
  // getAccount
  type GetAccountReturnType,
  getAccount,
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
  // getBalance
  type GetBalanceParameters,
  type GetBalanceReturnType,
  type GetBalanceError,
  getBalance,
  type WatchBalanceParameters,
  type WatchBalanceReturnType,
  watchBalance,
  // getBlockNumber
  type GetBlockNumberError,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
  // getChainId
  type GetChainIdReturnType,
  getChainId,
  type WatchChainIdParameters,
  type WatchChainIdReturnType,
  watchChainId,
  // getConnections
  type GetConnectionsReturnType,
  getConnections,
  type WatchConnectionsParameters,
  type WatchConnectionsReturnType,
  watchConnections,
  // reconnect
  type ReconnectError,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
  // signMessage
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
  // switchAccount
  type SwitchAccountError,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
  // switchChain
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '@wagmi/core'
