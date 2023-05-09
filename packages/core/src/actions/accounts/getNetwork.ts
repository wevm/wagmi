import type { Chain } from '../../chains'
import { getConfig } from '../../config'

export type GetNetworkResult = {
  chain?: Chain & {
    unsupported?: boolean
  }
  chains: Chain[]
}

export function getNetwork(): GetNetworkResult {
  const config = getConfig()

  const chainId = config.data?.chain?.id
  const activeChains = config.chains ?? []
  const activeChain = [
    ...(config.publicClient?.chains || []),
    ...activeChains,
  ].find((x) => x.id === chainId) ?? {
    id: chainId,
    name: `Chain ${chainId}`,
    network: `${chainId}`,
    nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
    rpcUrls: {
      default: { http: [''] },
      public: { http: [''] },
    },
  }

  return {
    chain: chainId
      ? {
          ...activeChain,
          ...config.data?.chain,
          id: chainId,
        }
      : undefined,
    chains: activeChains,
  } as const
}
