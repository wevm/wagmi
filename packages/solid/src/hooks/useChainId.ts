import {
  type Config,
  type GetChainIdReturnType,
  type ResolvedRegister,
  getChainId,
  watchChainId,
} from '@wagmi/core'

import { type Accessor, createSignal, onCleanup } from 'solid-js'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainIdParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainIdReturnType<config extends Config = Config> = Accessor<
  GetChainIdReturnType<config>
>

export function useChainId<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainIdParameters<config> = {},
): UseChainIdReturnType<config> {
  const config = useConfig(parameters)

  const [chainId, setChainId] = createSignal<GetChainIdReturnType<config>>(
    getChainId(config),
  )

  const unsubscribe = watchChainId(config, {
    onChange: () => setChainId(() => getChainId(config)),
  })

  onCleanup(() => {
    unsubscribe()
  })

  return chainId
}
