import type { WatchNetworkCallback } from '@wagmi/core'
import { getNetwork, watchNetwork } from '@wagmi/core'
import { useCallback } from 'react'

import { useConfig } from '../../context'
import { useSyncExternalStoreWithTracked } from '../utils'

export function useNetwork() {
  const config = useConfig()
  // rome-ignore lint/nursery/useExhaustiveDependencies: see comment below
  const watchNetwork_ = useCallback(
    (callback: WatchNetworkCallback) =>
      // Ideally this would be `watchNetworkCore(callback, undefined, config)`,
      // but `watchNetworkCore` does not take `config` (#2666).
      // For now, this works due to referential inequality.
      watchNetwork(callback),
    [config],
  )
  return useSyncExternalStoreWithTracked(watchNetwork_, getNetwork)
}
