import { getNetwork } from '../actions'
import { ChainMismatchError } from '../errors'

export function assertActiveChain({ chainId }: { chainId: number }) {
  const { chain: activeChain, chains } = getNetwork()
  const activeChainId = activeChain?.id
  if (chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }
}
