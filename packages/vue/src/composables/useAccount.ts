import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { type Ref, onScopeDispose, readonly, ref } from 'vue'

import { type ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseAccountParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseAccountReturnType<config extends Config = Config> = Ref<
  GetAccountReturnType<config>
>

/** https://wagmi.sh/vue/api/hooks/useAccount */
export function useAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = {},
): UseAccountReturnType<config> {
  const config = useConfig(parameters)

  const account = ref<GetAccountReturnType>(getAccount(config))

  const unsubscribe = watchAccount(config, {
    onChange(data) {
      account.value = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(account)
}
