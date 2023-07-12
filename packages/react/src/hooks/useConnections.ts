import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import { useSyncExternalStore } from 'react'

import { useConfig } from './useConfig.js'

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://wagmi.sh/react/hooks/useConnections */
export function useConnections(): UseConnectionsReturnType {
  const config = useConfig()
  return useSyncExternalStore(
    (onChange) => watchConnections(config, { onChange }),
    () => getConnections(config),
  )
}
