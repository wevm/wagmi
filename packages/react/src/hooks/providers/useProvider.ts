import { getProvider } from '@wagmi/core'
import { useQuery } from 'react-query'

import { useClient } from '../../context'

export const queryKey = () => [{ entity: 'provider' }] as const

const queryFn = () => getProvider()

export function useProvider() {
  const client = useClient()
  const query = useQuery(queryKey(), queryFn, { initialData: getProvider() })
  return query.data || client.provider
}
