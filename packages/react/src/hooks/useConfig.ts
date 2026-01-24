'use client'

import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { useContext } from 'react'
import { WagmiContext } from '../context.js'
import { WagmiProviderNotFoundError } from '../errors/context.js'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> = config

/** https://wagmi.sh/react/api/hooks/useConfig */
export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  // biome-ignore lint/correctness/useHookAtTopLevel: false alarm
  const config = parameters.config ?? useContext(WagmiContext)
  if (!config) throw new WagmiProviderNotFoundError()
  return config as UseConfigReturnType<config>
}
