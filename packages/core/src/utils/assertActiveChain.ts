import { getNetwork } from '../actions'
import { getClient } from '../client'
import { ChainMismatchError, ChainNotConfiguredError } from '../errors'
import type { WalletClient } from '../types'

export function assertActiveChain({
  chainId,
  walletClient,
}: {
  chainId: number
  walletClient?: WalletClient
}) {
  // Check that active chain and target chain match
  const { chain: activeChain, chains } = getNetwork()
  const activeChainId = activeChain?.id
  if (activeChainId && chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }

  if (walletClient) {
    // Check that Wallet Client's chain and target chain match
    const walletClientChainId = walletClient.chain.id
    if (walletClientChainId && chainId !== walletClientChainId) {
      const connector = getClient().connector
      throw new ChainNotConfiguredError({
        chainId,
        connectorId: connector?.id ?? 'unknown',
      })
    }
  }
}
