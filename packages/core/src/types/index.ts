import {
  BlockExplorer,
  BlockExplorerName,
  RpcProviderName,
  units,
} from '../constants'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: { [key in RpcProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  blockExplorers?: {
    [key in BlockExplorerName]: BlockExplorer
  } & {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  testnet?: boolean
}

export type Unit = typeof units[number]

declare global {
  type AddEthereumChainParameter = {
    chainId: string // A 0x-prefixed hexadecimal string
    chainName: string
    nativeCurrency?: {
      name: string
      symbol: string // 2-6 characters long
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls?: string[]
    iconUrls?: string[] // Currently ignored.
  }

  type WatchAssetParams = {
    type: 'ERC20' // In the future, other standards will be supported
    options: {
      address: string // The address of the token contract
      decimals: number // The number of token decimals
      image?: string // A string url of the token logo
      symbol: string // A ticker symbol or shorthand, up to 5 characters
    }
  }

  type RequestArguments =
    | { method: 'eth_accounts' }
    | { method: 'eth_chainId' }
    | { method: 'eth_requestAccounts' }
    | { method: 'personal_sign'; params: [string, string] }
    | { method: 'wallet_addEthereumChain'; params: AddEthereumChainParameter[] }
    | { method: 'wallet_switchEthereumChain'; params: [{ chainId: string }] }
    | { method: 'wallet_watchAsset'; params: WatchAssetParams }

  type InjectedProviders = {
    isBraveWallet?: true
    isCoinbaseWallet?: true
    isFrame?: true
    isMetaMask?: true
    isTally?: true
  }

  interface Ethereum extends InjectedProviders {
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request<T = any>(args: RequestArguments): Promise<T>
    providers?: Ethereum[]
  }

  interface Window {
    ethereum?: Ethereum
  }

  interface ProviderRpcError extends Error {
    code: 4001 | 4902
    data?: unknown
    message: string
  }
}
