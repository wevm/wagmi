import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'
import { type Ref, onScopeDispose, ref } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectorsParameters = ConfigParameter

export type UseConnectorsReturnType = Ref<GetConnectorsReturnType>

/** https://wagmi.sh/vue/api/composables/useConnectors */
export function useConnectors(
  parameters: UseConnectorsParameters = {},
): UseConnectorsReturnType {
  const config = useConfig(parameters)

  const connectors = ref(getConnectors(config))
  const unsubscribe = watchConnectors(config, {
    onChange(data) {
      connectors.value = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return connectors
}
