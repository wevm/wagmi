import { wagmiClient } from '../client'
import { NetworkReturnData, getNetwork } from './getNetwork'

export function watchNetwork(callback: (Network: NetworkReturnData) => void) {
  const handleChange = () => callback(getNetwork())
  const unsubscribe = wagmiClient.subscribe(
    (store) => [store.data?.chain, store.connector],
    handleChange,
  )
  return unsubscribe
}
