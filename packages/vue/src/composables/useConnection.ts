import {
  type Config,
  type GetConnectionReturnType,
  getConnection,
  type ResolvedRegister,
  watchConnection,
} from '@wagmi/core'
import { onScopeDispose, reactive, readonly, type ToRefs, toRefs } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { updateState } from '../utils/updateState.js'
import { useConfig } from './useConfig.js'

export type UseConnectionParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConnectionReturnType<config extends Config = Config> = ToRefs<
  GetConnectionReturnType<config>
>

/** https://wagmi.sh/vue/api/composables/useConnection */
export function useConnection<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectionParameters<config> = {},
): UseConnectionReturnType<config> {
  const config = useConfig(parameters)

  const connection = reactive(getConnection(config))

  const unsubscribe = watchConnection(config, {
    onChange(data) {
      updateState(connection, data)
    },
  })
  onScopeDispose(() => unsubscribe())

  return toRefs(readonly(connection)) as UseConnectionReturnType<config>
}
