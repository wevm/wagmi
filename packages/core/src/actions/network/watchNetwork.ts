import { wagmiClient } from '../../client'
import { NetworkResult, getNetwork } from './getNetwork'

export type WatchNetworkCallback = (Network: NetworkResult) => void

export function watchNetwork(callback: WatchNetworkCallback) {
  const handleChange = () => callback(getNetwork())
  const unsubscribe = wagmiClient.subscribe(
    ({ data, connector }) => [data?.chain, connector],
    handleChange,
  )
  return unsubscribe
}
