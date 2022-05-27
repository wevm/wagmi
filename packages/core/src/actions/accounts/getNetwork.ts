import { getClient } from '../../client'
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

  const chains = client.chains
  const chainId = client.data?.chain?.id
  const activeChain = chains.find((x) => x.id === chainId) ?? {
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
    chains,
  }
}
