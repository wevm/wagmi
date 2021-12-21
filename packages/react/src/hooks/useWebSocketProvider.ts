import { useContext } from './useContext'

export const useWebSocketProvider = () => {
  const { state } = useContext()
  return state.webSocketProvider
}
