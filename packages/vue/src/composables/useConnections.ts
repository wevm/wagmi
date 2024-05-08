import { type GetConnectionsReturnType, getConnections } from '@wagmi/core'
import { reactive } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://wagmi.sh/vue/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)
  const connections = reactive(getConnections(config))
  return connections
}
