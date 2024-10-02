import type { Config, ResolvedRegister } from '@wagmi/core'
import { useContext } from 'solid-js'

import { WagmiContext } from '../context.jsx'
import { WagmiProviderNotFoundError } from '../errors/context.js'
import type { ConfigParameter } from '../types/properties.js'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> = config

export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  const config = parameters.config ?? useContext(WagmiContext)
  if (!config) throw new WagmiProviderNotFoundError()
  return config as UseConfigReturnType<config>
}
