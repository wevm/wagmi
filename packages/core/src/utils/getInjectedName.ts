export function getInjectedName(ethereum?: Window['ethereum']) {
  if (!ethereum) return 'Injected'
  if (ethereum.isMetaMask) return 'MetaMask'
  if (ethereum.isBraveWallet) return 'Brave Wallet'
  if (ethereum.isCoinbaseWallet) return 'Coinbase Wallet'
  if (ethereum.isFrame) return 'Frame'
  if (ethereum.isTally) return 'Tally'
  return 'Injected'
}
