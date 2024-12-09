import type { Config, ResolvedRegister } from '@wagmi/core'

import { getWagmiConfig } from '$lib/context.js'
import { WagmiProviderNotFoundError } from '$lib/errors.js'
import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '../types.js'

export type UseConfigParameters<config extends Config = Config> =
  RuneParameters<ConfigParameter<config>>

export type UseConfigReturnType<config extends Config = Config> =
  RuneReturnType<config>

/** https://wagmi.sh/react/api/hooks/useConfig */
export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = () => ({}),
): UseConfigReturnType<config> {
  const contextConfig = getWagmiConfig()
  const config = $derived(parameters().config ?? contextConfig)
  if (!config) throw new WagmiProviderNotFoundError()

  return (() => config) as UseConfigReturnType<config>
}
