import { client } from '../../client'
import { GetNetworkResult, getNetwork } from './getNetwork'

export type WatchNetworkCallback = (data: GetNetworkResult) => void

export function watchNetwork(callback: WatchNetworkCallback) {
  const handleChange = () => callback(getNetwork())
  const unsubscribe = client.subscribe(
    ({ data, connector }) => ({ chainId: data?.chain?.id, connector }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.chainId === previous.chainId &&
        selected.connector === previous.connector,
    },
  )
  return unsubscribe
}
