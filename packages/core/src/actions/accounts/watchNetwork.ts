import { getClient } from '../../client'
import { GetNetworkResult, getNetwork } from './getNetwork'

export type WatchNetworkCallback = (data: GetNetworkResult) => void

export function watchNetwork(callback: WatchNetworkCallback) {
  const client = getClient()
  const handleChange = () => callback(getNetwork())
  const unsubscribe = client.subscribe(
    ({ data, chains }) => ({ chainId: data?.chain?.id, chains }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.chainId === previous.chainId &&
        selected.chains === previous.chains,
    },
  )
  return unsubscribe
}
