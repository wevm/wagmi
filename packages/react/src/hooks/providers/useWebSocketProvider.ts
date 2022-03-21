import { getWebSocketProvider } from '@wagmi/core'
import { useQuery } from 'react-query'

export const queryKey = () => [{ entity: 'webSocketProvider' }] as const

const queryFn = () => getWebSocketProvider()

export function useWebSocketProvider() {
  const query = useQuery(queryKey(), queryFn, {
    initialData: getWebSocketProvider(),
  })
  return query.data
}
