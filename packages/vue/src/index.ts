export { createClient, useClient } from './client'
export type { Client, CreateClientConfig } from './client'

export { useAccount, useConnect, useDisconnect } from './hooks'

export {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  configureChains,
  createStorage,
  deepEqual,
  deserialize,
  erc20ABI,
  erc721ABI,
  erc4626ABI,
  goerli,
  mainnet,
  readContracts,
  serialize,
} from '@wagmi/core'
export type {
  Chain,
  ChainProviderFn,
  ConnectorData,
  ConnectorEvents,
  Storage,
  Unit,
} from '@wagmi/core'

export type { Address } from 'abitype'
