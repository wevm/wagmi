import { getWebSocketProvider } from '@wagmi/core'
import { useQuery } from 'react-query'

import { useClient } from '../../context'

export const queryKey = () => [{ entity: 'webSocketProvider' }] as const

const queryFn = () => {
  return getWebSocketProvider()
}

export function useWebSocketProvider() {
  const client = useClient()
  const query = useQuery(queryKey(), queryFn, {
    initialData: getWebSocketProvider(),
  })
  return query.data || client.webSocketProvider
}
