type RequestArguments =
  | {
      method:
        | 'eth_requestAccounts'
        | 'eth_chainId'
        | 'net_version'
        | 'eth_accounts'
    }
  | {
      method: 'wallet_switchEthereumChain' | 'wallet_addEthereumChain'
      params: [{ chainId: string }]
    }

interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

interface Window {
  ethereum?: {
    autoRefreshOnNetworkChange?: boolean
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request(args: RequestArguments): Promise<unknown>
  }
  web3?: Record<string, unknown>
}
