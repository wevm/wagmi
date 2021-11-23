import { useContext } from './useContext'

export const useProvider = () => {
  const [state] = useContext()
  return state.data?.provider
}
