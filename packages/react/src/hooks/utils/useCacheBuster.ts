import { useClient } from '../../context'

export const useCacheBuster = () => {
  const context = useClient()
  return context.state.cacheBuster
}
