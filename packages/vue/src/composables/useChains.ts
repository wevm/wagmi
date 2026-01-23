import {
  type Config,
  type GetChainsReturnType,
  getChains,
  type ResolvedRegister,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { watchChains } from '@wagmi/core/internal'
import { onScopeDispose, type Ref, readonly, ref } from 'vue'
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
