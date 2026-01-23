'use client'

import {
  type Config,
  type GetChainsReturnType,
  getChains,
  type ResolvedRegister,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { watchChains } from '@wagmi/core/internal'
import { useSyncExternalStore } from 'react'
import { useConfig } from './useConfig.js'

export type UseChainsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainsReturnType<config extends Config = Config> =
  GetChainsReturnType<config>

/** https://wagmi.sh/react/api/hooks/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainsParameters<config> = {},
): UseChainsReturnType<config> {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchChains(config, { onChange }),
    () => getChains(config),
    () => getChains(config),
  )
}
