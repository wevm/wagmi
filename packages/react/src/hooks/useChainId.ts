import {
  type Config,
  type GetChainIdReturnType,
  type ResolvedRegister,
  getChainId,
  watchChainId,
} from '@wagmi/core'
import { useSyncExternalStore } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainIdParameters<
  config extends Config = ResolvedRegister['config'],
> = ConfigParameter<config>

export type UseChainIdReturnType<
  config extends Config = ResolvedRegister['config'],
> = GetChainIdReturnType<config>

/** https://wagmi.sh/react/hooks/useChainId */
export function useChainId<config extends Config>(
  parameters: UseChainIdParameters<config> = {},
): UseChainIdReturnType<config> {
  const config = useConfig(parameters)
  return useSyncExternalStore(
    (onChange) => watchChainId(config, { onChange }),
    () => getChainId(config),
  )
}
