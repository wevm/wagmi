import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'
import {
  type GetAccountReturnType,
  getAccount,
  watchAccount,
} from '@wagmi/core'

import { useConfig } from './useConfig.js'

export type UseAccountReturnType = GetAccountReturnType

/** https://wagmi.sh/react/hooks/useAccount */
export function useAccount(): UseAccountReturnType {
  const config = useConfig()
  return useSyncExternalStoreWithTracked(
    (onChange) => watchAccount(config, { onChange }),
    () => getAccount(config),
  )
}
