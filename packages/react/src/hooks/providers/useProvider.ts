import { useClient } from '../../context'

export function useProvider() {
  const { provider } = useClient()
  return provider
}
