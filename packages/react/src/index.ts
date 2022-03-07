export {
  Context,
  Provider as WagmiProvider,
  Provider,
  useClient,
  type Props as ProviderProps,
  type Props as WagmiProviderProps,
} from './context'

export { useAccount, useConnect } from './hooks'

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
  createWagmiStorage,
  defaultChains,
  defaultL2Chains,
  developmentChains,
  erc1155ABI,
  erc20ABI,
  erc721ABI,
  normalizeChainId,
} from '@wagmi/core'

export type { Chain, ConnectorData } from '@wagmi/core'
