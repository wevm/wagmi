export { Provider, useContext } from './context'
export type { Props as ProviderProps } from './context'

export {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContract,
  useContractEvent,
  useEnsAvatar,
  useEnsLookup,
  useEnsResolver,
  useFeeData,
  useNetwork,
  useProvider,
  useSignMessage,
  useToken,
  useWebSocketProvider,
} from './hooks'

export {
  Connector,
  InjectedConnector,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
  defaultL2Chains,
  developmentChains,
  erc1155ABI,
  erc20ABI,
  erc721ABI,
  normalizeChainId,
  normalizeMessage,
} from 'wagmi-private'
export type { Chain, Data, Message } from 'wagmi-private'
