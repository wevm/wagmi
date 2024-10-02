import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import { onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = GetConnectionsReturnType

export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  const [connections, setConnections] = createStore<GetConnectionsReturnType>(
    getConnections(config),
  )

  const unsubscribe = watchConnections(config, {
    onChange: () => setConnections(getConnections(config)),
  })

  onCleanup(() => {
    unsubscribe()
  })

  return connections
}
