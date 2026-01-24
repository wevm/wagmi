'use client'

import {
  type Config,
  type GetConnectorsReturnType,
  getConnectors,
  type ResolvedRegister,
  watchConnectors,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { useSyncExternalStore } from 'react'
import { useConfig } from './useConfig.js'

export type UseConnectorsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConnectorsReturnType<config extends Config = Config> =
  GetConnectorsReturnType<config>

/** https://wagmi.sh/react/api/hooks/useConnectors */
export function useConnectors<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectorsParameters<config> = {},
): UseConnectorsReturnType<config> {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchConnectors(config, { onChange }),
    () => getConnectors(config),
    () => getConnectors(config),
  )
}
