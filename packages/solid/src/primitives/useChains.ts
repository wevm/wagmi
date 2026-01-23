import {
  type Config,
  type GetChainsReturnType,
  getChains,
  type ResolvedRegister,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { watchChains } from '@wagmi/core/internal'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: useChains.Parameters<config> = () => ({}),
): useChains.ReturnType<config> {
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

export namespace useChains {
  export type Parameters<config extends Config = Config> = Accessor<
    ConfigParameter<config>
  >
  export type ReturnType<config extends Config = Config> = Accessor<
    GetChainsReturnType<config>
  >
  export type SolidParameters<config extends Config = Config> =
    ConfigParameter<config>
  export type SolidReturnType<config extends Config = Config> =
    GetChainsReturnType<config>
}
