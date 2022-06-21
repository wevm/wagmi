import { getNetwork, watchNetwork } from '@wagmi/core'

import { shallowEqual } from '../../utils'
import { useSyncExternalStoreWithTracked } from '../utils'

export function useNetwork() {
  return useSyncExternalStoreWithTracked(
    watchNetwork,
    getNetwork,
    getNetwork,
    (a, b) => {
      if (!a?.chain || !b?.chain) return shallowEqual(a, b)
      return (
        a?.chain?.id === b?.chain?.id &&
        shallowEqual(
          a?.chains?.map(({ id }) => id),
          b?.chains?.map(({ id }) => id),
        )
      )
    },
  )
}
