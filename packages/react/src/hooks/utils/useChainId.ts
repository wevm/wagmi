import { useProvider } from '../providers'

export type UseChainIdArgs = {
  chainId?: number
}

export function useChainId({ chainId }: UseChainIdArgs = {}) {
  const provider = useProvider({ chainId })
  return provider.network.chainId
}
