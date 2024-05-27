'use client'

import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

export type UseAccountParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseAccountReturnType<config extends Config = Config> =
  GetAccountReturnType<config>

/** https://wagmi.sh/react/api/hooks/useAccount */
export function useAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = {},
): UseAccountReturnType<config> {
  const config = useConfig(parameters)

  return useSyncExternalStoreWithTracked(
    (onChange) => watchAccount(config, { onChange }),
    () => getAccount(config),
  )
}
