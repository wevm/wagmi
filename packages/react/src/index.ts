export {
  Provider,
  Provider as WagmiProvider,
  useClient as useContext,
  Context,
} from './context'
export type {
  Props as ProviderProps,
  Props as WagmiProviderProps,
} from './context'

export { useConnect } from './hooks'

export {
  AddChainError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  InjectedConnector,
  SwitchChainError,
  UserRejectedRequestError,
  allChains,
  chain,
  createWagmiClient,
  createStorage,
  defaultChains,
  defaultL2Chains,
  developmentChains,
  erc1155ABI,
  erc20ABI,
  erc721ABI,
  normalizeChainId,
} from '@wagmi/core'

export type { Chain, ConnectorData } from '@wagmi/core'
