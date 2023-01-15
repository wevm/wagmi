import { useProvider } from '../providers'

export type UseChainIdArgs = {
  chainId?: number
}

export function useChainId(props: UseChainIdArgs = { chainId: 1 }) {
  const provider = useProvider({ chainId: props.chainId })
  return provider()?.network.chainId
}
