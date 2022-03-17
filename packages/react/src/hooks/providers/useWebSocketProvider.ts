import { useClient } from '../../context'

export function useWebSocketProvider() {
  const { webSocketProvider } = useClient()
  return webSocketProvider
}
