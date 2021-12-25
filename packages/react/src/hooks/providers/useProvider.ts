import { useContext } from '../../context'

export const useProvider = () => {
  const { state } = useContext()
  return state.provider
}
