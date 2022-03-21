import { getProvider } from '@wagmi/core'
import { useQuery } from 'react-query'

export const queryKey = () => [{ entity: 'provider' }] as const

const queryFn = () => getProvider()

export function useProvider() {
  const query = useQuery(queryKey(), queryFn, { initialData: getProvider() })
  return query.data
}
