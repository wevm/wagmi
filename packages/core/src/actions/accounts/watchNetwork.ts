import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import type { Chain } from '../../types'
import type { GetNetworkResult } from './getNetwork'
import { getNetwork } from './getNetwork'

export type WatchNetworkCallback = (data: GetNetworkResult) => void

export type WatchNetworkConfig = {
  selector?({ chainId, chains }: { chainId?: number; chains?: Chain[] }): any
}

export function watchNetwork(
  callback: WatchNetworkCallback,
  { selector = (x) => x }: WatchNetworkConfig = {},
) {
  const client = getClient()
  const handleChange = () => callback(getNetwork())
  const unsubscribe = client.subscribe(
    ({ data, chains }) => selector({ chainId: data?.chain?.id, chains }),
    handleChange,
    {
      equalityFn: shallow,
    },
  )
  return unsubscribe
}
