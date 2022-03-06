import { useClient } from '../../context'

export const useWebSocketProvider = () => {
  const { state } = useClient()
  return state.webSocketProvider
}
