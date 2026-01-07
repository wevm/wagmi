'use client'

import {
  type Config,
  type GetConnectionReturnType,
  getConnection,
  type ResolvedRegister,
  watchConnection,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

export type UseConnectionParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConnectionReturnType<config extends Config = Config> =
  GetConnectionReturnType<config>

/** https://wagmi.sh/react/api/hooks/useConnection */
export function useConnection<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectionParameters<config> = {},
): UseConnectionReturnType<config> {
  const config = useConfig(parameters)

  return useSyncExternalStoreWithTracked(
    (onChange) => watchConnection(config, { onChange }),
    () => getConnection(config),
  )
}
