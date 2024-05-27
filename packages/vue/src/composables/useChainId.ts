import {
  type Config,
  type GetChainIdReturnType,
  type ResolvedRegister,
  getChainId,
  watchChainId,
} from '@wagmi/core'
import { type Ref, onScopeDispose, readonly, ref } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainIdParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseChainIdReturnType<config extends Config = Config> = Ref<
  GetChainIdReturnType<config>
>

/** https://wagmi.sh/vue/api/composables/useChainId */
export function useChainId<config extends Config = ResolvedRegister['config']>(
  parameters: UseChainIdParameters<config> = {},
): UseChainIdReturnType<config> {
  const config = useConfig(parameters)

  const chainId = ref<GetChainIdReturnType>(getChainId(config))
  const unsubscribe = watchChainId(config, {
    onChange(data) {
      chainId.value = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(chainId)
}
