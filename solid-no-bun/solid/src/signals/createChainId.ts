import {
  type Config,
  type GetChainIdReturnType,
  type ResolvedRegister,
  getChainId,
  watchChainId,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.ts'
import { createConfig } from './createConfig.ts'
import { createStore } from 'solid-js/store'
import { onCleanup } from 'solid-js'
import type { FunctionedParams } from '@tanstack/solid-query'

export type UseChainIdParameters<config extends Config = Config> =
FunctionedParams<ConfigParameter<config>>

export type UseChainIdReturnType<config extends Config = Config> =
  { chain: { id: GetChainIdReturnType<config> } }

/** https://wagmi.sh/react/api/hooks/useChainId */
export function createChainId<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainIdParameters<config> = ()=>({}),
): UseChainIdReturnType<config> {
  const config = createConfig(parameters)

  const [chain, setChain] = createStore({ id: getChainId(config) })

  function onChange(_id: GetChainIdReturnType<config>){
    setChain({ id: _id })
  }

  const unsubscribe = watchChainId(config, { onChange })

  onCleanup(unsubscribe)

  return { chain }
}
