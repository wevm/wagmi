import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'
import { getAccount, watchAccount } from '@wagmi/core'

import { useConfig } from '../context.js'

export function useAccount() {
  const config = useConfig()
  return useSyncExternalStoreWithTracked(
    (onChange) => watchAccount(config, { onChange }),
    () => getAccount(config),
  )
}
