import { useProvider } from '../providers'

export function useChainId() {
  const provider = useProvider()
  return provider?.network?.chainId
}
