import { useContext } from './useContext'

export const useAccount = () => {
  const [state] = useContext()
  return state.data?.account
}
