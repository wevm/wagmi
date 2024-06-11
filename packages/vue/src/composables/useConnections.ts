import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import { type Ref, onScopeDispose, readonly, ref } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = Ref<GetConnectionsReturnType>

/** https://wagmi.sh/vue/api/composables/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  const connections = ref(getConnections(config))
  const unsubscribe = watchConnections(config, {
    onChange(data) {
      connections.value = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(connections) as UseConnectionsReturnType
}
