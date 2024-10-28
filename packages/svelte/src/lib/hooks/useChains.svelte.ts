import {
  type Config,
  type GetChainsReturnType,
  type ResolvedRegister,
  getChains,
} from '@wagmi/core'
import { watchChains } from '@wagmi/core/internal'

import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'

export type UseChainsParameters<config extends Config = Config> =
  RuneParameters<ConfigParameter<config>>

export type UseChainsReturnType<config extends Config = Config> =
  RuneReturnType<GetChainsReturnType<config>>

/** https://wagmi.sh/react/api/hooks/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainsParameters<config> = () => ({}),
): UseChainsReturnType<config> {
  const config = $derived.by(useConfig(parameters))
  let chains = $state(getChains(config))

  $effect(() => {
    chains = getChains(config)
    const unsubscribe = watchChains(config, {
      onChange: (newChains) => {
        chains = newChains
      },
    })

    return unsubscribe
  })

  return () => chains
}
