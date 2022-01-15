export const getInjectedName = (ethereum?: Window['ethereum']) => {
  if (!ethereum) return 'Injected'
  if (ethereum.isMetaMask) return 'MetaMask'
  if (ethereum.isCoinbaseWallet) return 'Coinbase Wallet'
  if (ethereum.isTally) return 'Tally'
  return 'Injected'
}
