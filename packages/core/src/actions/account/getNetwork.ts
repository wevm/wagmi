import { wagmiClient } from '../../client'
import { allChains } from '../../constants'
import { Chain } from '../../types'

export type NetworkResult = {
  chain?: Chain & {
    id: number
    unsupported?: boolean
  }
  chains?: Chain[]
}

export function getNetwork(): NetworkResult {
  const { connector, data } = wagmiClient

  const chainId = data?.chain?.id
  const unsupported = data?.chain?.unsupported
  const activeChains = connector?.chains ?? []
  const activeChain: Chain | undefined = [...activeChains, ...allChains].find(
    (x) => x.id === chainId,
  )

  return {
    chain:
      activeChain && chainId
        ? {
            ...activeChain,
            id: chainId,
            unsupported,
          }
        : undefined,
    chains: activeChains,
  }
}
