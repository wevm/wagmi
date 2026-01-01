import {
  type Config,
  type GetChainsReturnType,
  getChains,
  type ResolvedRegister,
} from '@wagmi/core'
import { watchChains } from '@wagmi/core/internal'

import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type SolidChainsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainsParameters<config extends Config = Config> = Accessor<
  ConfigParameter<config>
>

export type SolidChainsReturnType<config extends Config = Config> =
  GetChainsReturnType<config>

export type UseChainsReturnType<config extends Config = Config> = Accessor<
  GetChainsReturnType<config>
>

/** https://wagmi.sh/solid/api/primitives/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainsParameters<config> = () => ({}),
): UseChainsReturnType<config> {
  const config = useConfig(parameters)

  const [chains, setChains] = createSignal<GetChainsReturnType<config>>(
    getChains(config()),
  )

  createEffect(() => {
    const unsubscribe = watchChains(config(), {
      onChange(data) {
        setChains(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })

  return chains
}
