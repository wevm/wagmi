import { useContext } from '../../context'

export const useCacheBuster = () => {
  const context = useContext()
  return context.state.cacheBuster
}
