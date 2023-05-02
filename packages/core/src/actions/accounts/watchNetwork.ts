import { shallow } from 'zustand/shallow'

import type { Chain } from '../../chains'
import { getConfig } from '../../config'
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
  const config = getConfig()
  const handleChange = () => callback(getNetwork())
  const unsubscribe = config.subscribe(
    ({ data, chains }) => selector({ chainId: data?.chain?.id, chains }),
    handleChange,
    {
      equalityFn: shallow,
    },
  )
  return unsubscribe
}
