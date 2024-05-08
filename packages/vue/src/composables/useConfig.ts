import { type Config, type ResolvedRegister } from '@wagmi/core'
import { hasInjectionContext, inject } from 'vue'

import {
  WagmiInjectionContextError,
  WagmiProviderNotFoundError,
} from '../errors/context.js'
import { configKey } from '../plugin.js'
import type { ConfigParameter } from '../types/properties.js'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> = config

/** https://wagmi.sh/vue/api/hooks/useConfig */
export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  // passthrough config if provided
  if (parameters.config) return parameters.config as UseConfigReturnType<config>

  // ensures that `inject()` can be used
  if (!hasInjectionContext()) throw new WagmiInjectionContextError()

  const config = inject<Config | undefined>(configKey)
  if (!config) throw new WagmiProviderNotFoundError()

  return config as UseConfigReturnType<config>
}
