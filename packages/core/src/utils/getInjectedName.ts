export const getInjectedName = (ethereum?: Window['ethereum']) => {
  if (!ethereum) return 'Injected'
  if (ethereum.isBraveWallet) return 'Brave Wallet'
  if (ethereum.isMetaMask) return 'MetaMask'
  if (ethereum.isCoinbaseWallet) return 'Coinbase Wallet'
  if (ethereum.isFrame) return 'Frame'
  if (ethereum.isTally) return 'Tally'
  return 'Injected'
}
