import { useClient } from '../../context'

export const useProvider = () => {
  const { state } = useClient()
  return state.provider
}
