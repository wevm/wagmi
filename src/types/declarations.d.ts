type AddEthereumChainParameter = {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

type RequestArguments =
  | { method: 'eth_accounts' }
  | { method: 'eth_chainId' }
  | { method: 'eth_requestAccounts' }
  | { method: 'wallet_addEthereumChain'; params: AddEthereumChainParameter[] }
  | { method: 'wallet_switchEthereumChain'; params: [{ chainId: string }] }

interface Window {
  ethereum?: {
    isMetaMask?: true
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
