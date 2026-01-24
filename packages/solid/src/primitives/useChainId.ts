import {
  type Config,
  type GetChainIdReturnType,
  getChainId,
  type ResolvedRegister,
  watchChainId,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/hooks/useChainId */
export function useChainId<config extends Config = ResolvedRegister['config']>(
  parameters: useChainId.Parameters<config> = () => ({}),
): useChainId.ReturnType<config> {
  const config = useConfig(parameters)
  const [chainId, setChainId] = createSignal(getChainId(config()))
  createEffect(() => {
    const _config = config()
    setChainId(() => getChainId(_config))
    const unsubscribe = watchChainId(_config, {
      onChange(data) {
        setChainId(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })
  return chainId
}

export namespace useChainId {
  export type Parameters<config extends Config = Config> = Accessor<
    SolidParameters<config>
  >
  export type ReturnType<config extends Config = Config> = Accessor<
    SolidReturnType<config>
  >
  export type SolidParameters<config extends Config = Config> =
    ConfigParameter<config>
  export type SolidReturnType<config extends Config = Config> =
    GetChainIdReturnType<config>
}
