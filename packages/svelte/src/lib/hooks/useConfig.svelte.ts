import type { Config, ResolvedRegister } from '@wagmi/core'

import { getWagmiConfig } from '$lib/context.js'
import { WagmiProviderNotFoundError } from '$lib/errors.js'
import type { ConfigParameter, RuneReturnType } from '$lib/types.js'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> =
  RuneReturnType<config>

/** https://wagmi.sh/react/api/hooks/useConfig */
export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  const config = parameters.config ?? getWagmiConfig()
  if (!config) throw new WagmiProviderNotFoundError()

  return (() => config) as UseConfigReturnType<config>
}
