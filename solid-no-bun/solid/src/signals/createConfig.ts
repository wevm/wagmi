import { type Config, type ResolvedRegister } from '@wagmi/core'

import { WagmiProviderNotFoundError } from '../errors/context.js'
import type { ConfigParameter } from '../types/properties.js'
import { config } from '../context.jsx'
import type { FunctionedParams } from '@tanstack/solid-query'

export type CreateConfigParameters<config extends Config = Config> =
FunctionedParams<ConfigParameter<config>>

export type CreateConfigReturnType<config extends Config = Config> = config

/** https://wagmi.sh/react/api/hooks/useConfig */
export function createConfig<config extends Config = ResolvedRegister['config']>(
  parameters: CreateConfigParameters<config> = ()=>({}),
): CreateConfigReturnType<config> {
  const _config = parameters().config ?? config()
  if (!_config) throw new WagmiProviderNotFoundError()
  return _config as CreateConfigReturnType<config>
}
