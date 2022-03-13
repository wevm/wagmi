import { useClient } from '../../context'

export const useProvider = () => {
  const { provider } = useClient()
  return provider
}
