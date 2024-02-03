import { type Config, type ResolvedRegister } from '@wagmi/core'

import { WagmiProviderNotFoundError } from '../errors/context.ts'
import type { ConfigParameter } from '../types/properties.ts'
import { config } from '../context.tsx'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> = config

/** https://wagmi.sh/react/api/hooks/useConfig */
export function createConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  const _config = parameters.config ?? config()
  if (!_config) throw new WagmiProviderNotFoundError()
  return _config as UseConfigReturnType<config>
}
