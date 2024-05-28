import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { type ToRefs, onScopeDispose, reactive, readonly, toRefs } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { updateState } from '../utils/updateState.js'
import { useConfig } from './useConfig.js'

export type UseAccountParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseAccountReturnType<config extends Config = Config> = ToRefs<
  GetAccountReturnType<config>
>

/** https://wagmi.sh/vue/api/composables/useAccount */
export function useAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = {},
): UseAccountReturnType<config> {
  const config = useConfig(parameters)

  const account = reactive(getAccount(config))

  const unsubscribe = watchAccount(config, {
    onChange(data) {
      updateState(account, data)
    },
  })
  onScopeDispose(() => unsubscribe())

  return toRefs(readonly(account)) as UseAccountReturnType<config>
}
