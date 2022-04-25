const injectedProvidersLookup: Record<keyof InjectedProviders, string> = {
  isMetaMask: 'MetaMask',
  // Place other options below in alphabetical order
  isBraveWallet: 'Brave Wallet',
  isCoinbaseWallet: 'Coinbase Wallet',
  isFrame: 'Frame',
  isTally: 'Tally',
}
const injectedOptions = Object.entries(injectedProvidersLookup)

export function getInjectedName(ethereum?: Window['ethereum']) {
  if (!ethereum) return 'Injected'
  for (const [key, val] of injectedOptions) {
    if (ethereum[<keyof InjectedProviders>key]) return val
  }
  return 'Injected'
}
