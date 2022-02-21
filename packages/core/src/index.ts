export { Connector, InjectedConnector } from './connectors'
export type { ConnectorEvents, Data } from './connectors'

export {
  connect,
  disconnect,
  getAccount,
  watchAccount,
  getNetwork,
  watchNetwork,
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
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from './errors'

export { createWagmiClient } from './client'

export type { Chain, Unit } from './types'

export { normalizeChainId } from './utils'
