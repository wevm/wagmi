export function getInjectedName(ethereum?: Window['ethereum']) {
  if (!ethereum) return 'Injected'

  const getName = (provider: Ethereum) => {
    if (provider.isMetaMask && !provider.isBraveWallet) return 'MetaMask'
    if (provider.isBraveWallet) return 'Brave Wallet'
    if (provider.isCoinbaseWallet) return 'Coinbase Wallet'
    if (provider.isFrame) return 'Frame'
    if (provider.isTally) return 'Tally'
    if (provider.isTrust) return 'Trust Wallet'
  }

  if (ethereum.providers?.length) {
    // Deduplicated names using Set
    // Coinbase Wallet puts multiple providers in `ethereum.providers`
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
