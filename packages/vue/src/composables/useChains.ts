import {
  type Config,
  type GetChainsReturnType,
  type ResolvedRegister,
  getChains,
} from '@wagmi/core'
import { watchChains } from '@wagmi/core/internal'

import { type Ref, onScopeDispose, readonly, ref } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainsParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainsReturnType<config extends Config = Config> = Ref<
  GetChainsReturnType<config>
>

/** https://wagmi.sh/vue/api/composables/useChains */
export function useChains<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainsParameters<config> = {},
): UseChainsReturnType<config> {
  const config = useConfig(parameters)

  const chains = ref<GetChainsReturnType<config>>(getChains(config))
  const unsubscribe = watchChains(config, {
    onChange(data) {
      chains.value = data as any
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(chains) as UseChainsReturnType<config>
}
