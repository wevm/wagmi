import { useClient } from '../../context'

export const useWebSocketProvider = () => {
  const { webSocketProvider } = useClient()
  return webSocketProvider
}
