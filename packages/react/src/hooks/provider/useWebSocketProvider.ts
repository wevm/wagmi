import { useContext } from '../../context'

export const useWebSocketProvider = () => {
  const { state } = useContext()
  return state.webSocketProvider
}
