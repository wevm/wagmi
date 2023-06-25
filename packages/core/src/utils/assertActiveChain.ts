import { getChainId } from '../actions/getChainId.js'
import type { Config } from '../config.js'
import { ChainMismatchError } from '../errors/config.js'

export function assertActiveChain(
  config: Config,
  { chainId }: { chainId: number },
) {
  // Check that active chain and target chain match
  const activeChainId = getChainId(config)
  if (activeChainId && chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain:
        config.chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        config.chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }
}
