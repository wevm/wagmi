import { usePublicClient } from '../viem'

export type UseChainIdArgs = {
  chainId?: number
}

export function useChainId({ chainId }: UseChainIdArgs = {}) {
  const publicClient = usePublicClient({ chainId })
  return publicClient.chain.id
}
