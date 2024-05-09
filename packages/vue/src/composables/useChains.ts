import {
  type Config,
  type GetChainsReturnType,
  type ResolvedRegister,
  getChains,
} from '@wagmi/core'
import { watchChains } from '@wagmi/core/internal'

import type { Chain } from 'viem'
import { onScopeDispose, reactive, readonly } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainsReturnType<config extends Config = Config> =
  | config['chains'] extends readonly [Chain, ...Chain[]]
  ? config['chains']
  : readonly [Chain, ...Chain[]]

/** https://wagmi.sh/vue/api/composables/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainsParameters<config> = {},
): UseChainsReturnType<config> {
  const config = useConfig(parameters)

  let chains = reactive<GetChainsReturnType>(getChains(config))

  const unsubscribe = watchChains(config, {
    onChange(data) {
      chains = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(chains)
}
