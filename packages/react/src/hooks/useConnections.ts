'use client'

import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { useSyncExternalStore } from 'react'
import { useConfig } from './useConfig.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://wagmi.sh/react/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchConnections(config, { onChange }),
    () => getConnections(config),
    () => getConnections(config),
  )
}
