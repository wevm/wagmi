import {
  type Config,
  type GetChainIdReturnType,
  getChainId,
  type ResolvedRegister,
  watchChainId,
} from '@wagmi/core'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type SolidChainIdParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainIdParameters<config extends Config = Config> = Accessor<
  SolidChainIdParameters<config>
>

export type SolidChainIdReturnType<config extends Config = Config> =
  GetChainIdReturnType<config>

export type UseChainIdReturnType<config extends Config = Config> = Accessor<
  SolidChainIdReturnType<config>
>

/** https://wagmi.sh/solid/api/hooks/useChainId */
export function useChainId<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainIdParameters<config> = () => ({}),
): UseChainIdReturnType<config> {
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
