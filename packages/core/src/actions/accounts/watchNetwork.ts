import { client } from '../../client'
import { GetNetworkResult, getNetwork } from './getNetwork'

export type WatchNetworkCallback = (data: GetNetworkResult) => void

export function watchNetwork(callback: WatchNetworkCallback) {
  const handleChange = () => callback(getNetwork())
  const unsubscribe = client.subscribe(
    ({ data, connector }) => [data?.chain, connector],
    handleChange,
  )
  return unsubscribe
}
