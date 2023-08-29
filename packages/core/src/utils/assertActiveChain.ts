import { getChainId } from '../actions/getChainId.js'
import type { Config } from '../createConfig.js'
import { ChainMismatchError } from '../errors/config.js'

type AssertActiveChainParamters = {
  activeChainId?: number | undefined
  chainId: number
}

export function assertActiveChain(
  config: Config,
  parameters: AssertActiveChainParamters,
) {
  const { chainId } = parameters

  // Check that active chain and target chain match
  const activeChainId = parameters.activeChainId ?? getChainId(config)
  if (activeChainId && chainId !== activeChainId) {
    const activeChain =
      config.chains.find((x) => x.id === activeChainId)?.name ??
      `Chain ${activeChainId}`
    const targetChain =
      config.chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`
    throw new ChainMismatchError({ activeChain, targetChain })
  }
}
