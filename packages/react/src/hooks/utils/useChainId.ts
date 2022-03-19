import { useQuery } from 'react-query'
import { getProvider } from '@wagmi/core'

export const queryKey = () => [{ entity: 'chainId' }] as const

const queryFn = () => {
  return getProvider().network.chainId
}

export function useChainId() {
  const { data } = useQuery(queryKey(), queryFn)
  return data
}
