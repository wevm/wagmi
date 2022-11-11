import { getNetwork } from '../actions'
import { getClient } from '../client'
import { ChainMismatchError, ChainNotConfiguredError } from '../errors'
import type { Signer } from '../types'

export function assertActiveChain({
  chainId,
  signer,
}: {
  chainId: number
  signer?: Signer
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

  if (signer) {
    // Check that signer's chain and target chain match
    const signerChainId = (signer.provider as { network?: { chainId: number } })
      ?.network?.chainId
    if (signerChainId && chainId !== signerChainId) {
      const connector = getClient().connector
      throw new ChainNotConfiguredError({
        chainId,
        connectorId: connector?.id ?? 'unknown',
      })
    }
  }
}
