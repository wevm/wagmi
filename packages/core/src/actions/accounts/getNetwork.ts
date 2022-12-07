import type { Chain } from '../../chains'
import { getClient } from '../../client'

export type GetNetworkResult = {
  chain?: Chain & {
    unsupported?: boolean
  }
  chains: Chain[]
}

export function getNetwork(): GetNetworkResult {
  const client = getClient()

  const chainId = client.data?.chain?.id
  const activeChains = client.chains ?? []
  const activeChain = [...(client.provider.chains || []), ...activeChains].find(
    (x) => x.id === chainId,
  ) ?? {
    id: chainId,
    name: `Chain ${chainId}`,
    network: `${chainId}`,
    nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
    rpcUrls: {
      default: { http: [''] },
    },
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
  } as const
}
