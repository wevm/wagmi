type RequestArguments = {
  method: 'eth_requestAccounts' | 'eth_chainId' | 'net_version' | 'eth_accounts'
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
