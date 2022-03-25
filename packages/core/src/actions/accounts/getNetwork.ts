import { client } from '../../client'
import { allChains } from '../../constants'
import { Chain } from '../../types'

export type GetNetworkResult = {
  chain?: Chain & {
    id: number
    unsupported?: boolean
  }
  chains?: Chain[]
}

export function getNetwork(): GetNetworkResult {
  const { chains, data } = client

  const chainId = data?.chain?.id
  const unsupported = data?.chain?.unsupported
  const activeChains = chains ?? []
  const activeChain = [...activeChains, ...allChains].find(
    (x) => x.id === chainId,
  ) ?? { id: chainId, name: `Chain ${chainId}`, rpcUrls: [] }

  return {
    chain: chainId
      ? {
          ...activeChain,
          id: chainId,
          unsupported,
        }
      : undefined,
    chains: activeChains,
  }
}
