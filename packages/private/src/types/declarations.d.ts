type AddEthereumChainParameter = {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency?: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
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
  isCoinbaseWallet?: true
  isFrame?: true
  isMetaMask?: true
  isTally?: true
}

interface Window {
  ethereum?: InjectedProviders & {
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request<T = any>(args: RequestArguments): Promise<T>
  }
}

interface ProviderRpcError extends Error {
  code: 4001 | 4902
  data?: unknown
  message: string
}
