import { wagmiClient } from '../client'
import { NetworkReturnData, getNetwork } from './getNetwork'

export function watchNetwork(callback: (Network: NetworkReturnData) => void) {
  const handleChange = () => callback(getNetwork())
  wagmiClient.on('stateChanged', handleChange)
  return () => {
    wagmiClient.off('stateChanged', handleChange)
  }
}
