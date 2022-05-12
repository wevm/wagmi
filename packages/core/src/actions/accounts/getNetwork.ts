import { getClient } from '../../client'
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
  const client = getClient()

  const chainId = client.data?.chain?.id
  const activeChains = client.chains ?? []
  const activeChain = [...activeChains, ...allChains].find(
    (x) => x.id === chainId,
  ) ?? {
    id: chainId,
    name: `Chain ${chainId}`,
    network: `${chainId}`,
    rpcUrls: { default: '' },
  }

  return {
    chain: chainId
      ? {
          ...activeChain,
          ...client.data?.chain,
          id: chainId,
        }
      : undefined,
    chains: activeChains,
  }
}
