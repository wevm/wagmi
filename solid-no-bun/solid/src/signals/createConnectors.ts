'use client'

import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'
import { useSyncExternalStore } from 'react'

import type { ConfigParameter } from '../types/properties.ts'
import { useConfig } from './createConfig.ts'

export type UseConnectorsParameters = ConfigParameter

export type UseConnectorsReturnType = GetConnectorsReturnType

/** https://wagmi.sh/react/api/hooks/useConnectors */
export function useConnectors(
  parameters: UseConnectorsParameters = {},
): UseConnectorsReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchConnectors(config, { onChange }),
    () => getConnectors(config),
    () => getConnectors(config),
  )
}
