import type { Ethereum } from '../types'

export function getInjectedName(ethereum?: Ethereum) {
  if (!ethereum) return 'Injected'

  const getName = (provider: Ethereum) => {
    if (provider.isAvalanche) return 'Core Wallet'
    if (provider.isBitKeep) return 'BitKeep'
    if (provider.isBraveWallet) return 'Brave Wallet'
    if (provider.isCoinbaseWallet) return 'Coinbase Wallet'
    if (provider.isExodus) return 'Exodus'
    if (provider.isFrame) return 'Frame'
    if (provider.isKuCoinWallet) return 'KuCoin Wallet'
    if (provider.isMathWallet) return 'MathWallet'
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
      return '1inch Wallet'
    if (provider.isOpera) return 'Opera'
    if (provider.isPortal) return 'Ripio Portal'
    if (provider.isTally) return 'Tally'
    if (provider.isTokenPocket) return 'TokenPocket'
    if (provider.isTokenary) return 'Tokenary'
    if (provider.isTrust || provider.isTrustWallet) return 'Trust Wallet'
    if (provider.isMetaMask) return 'MetaMask'
  }

  // Some injected providers detect multiple other providers and create a list at `ethers.providers`
  if (ethereum.providers?.length) {
    // Deduplicate names using Set
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
    if (names.length) return names
    return names[0] ?? 'Injected'
  }

  return getName(ethereum) ?? 'Injected'
}
