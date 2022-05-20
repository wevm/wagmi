export {
  createClient,
  WagmiConfig,
  /** @deprecated use `WagmiConfig` instead */
  WagmiConfig as WagmiProvider,
  useClient,
} from './context'
export type { CreateClientConfig, WagmiConfigProps } from './context'

export {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContract,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useFeeData,
  useNetwork,
  useProvider,
  useQuery,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSigner,
  useToken,
  useWaitForTransaction,
  useWebSocketProvider,
} from './hooks'

export { deserialize, serialize } from './utils'

export {
  Client,
  Connector,
  alchemyRpcUrls,
  allChains,
  chain,
  chainId,
  configureChains,
  createStorage,
  defaultChains,
  defaultL2Chains,
  erc20ABI,
  erc721ABI,
  etherscanBlockExplorers,
  infuraRpcUrls,
  AddChainError,
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
} from '@wagmi/core'
export type {
  Chain,
  ChainProvider,
  ConnectorData,
  ConnectorEvents,
  Storage,
  Unit,
} from '@wagmi/core'
