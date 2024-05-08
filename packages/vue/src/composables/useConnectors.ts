import { type GetConnectorsReturnType, getConnectors } from '@wagmi/core'

import { reactive } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectorsParameters = ConfigParameter

export type UseConnectorsReturnType = GetConnectorsReturnType

/** https://wagmi.sh/vue/api/hooks/useConnectors */
export function useConnectors(
  parameters: UseConnectorsParameters = {},
): UseConnectorsReturnType {
  const config = useConfig(parameters)
  const connectors = reactive(getConnectors(config))
  return connectors as UseConnectorsReturnType
}
