const injectedProvidersLookup: Record<keyof InjectedProviderFlags, string> = {
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

  const getName = (provider: Ethereum) => {
    for (const [key, val] of injectedOptions) {
      if (provider[<keyof InjectedProviders>key]) return val
    }
  }

  if (ethereum.providers?.length) {
    const nameSet = new Set<string>()
    let unknownCount = 1
    for (const provider of ethereum.providers) {
      let name = getName(provider)
      if (!name) {
        name = `Unknown Wallet #${unknownCount}`
        unknownCount += 1
      }
      nameSet.add(name)
    }
    const names = [...nameSet]
    return names.length ? names : names[0]
  }

  return getName(ethereum) ?? 'Injected'
}
