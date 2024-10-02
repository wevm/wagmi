import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'
import { onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectorsParameters = ConfigParameter

export type UseConnectorsReturnType = GetConnectorsReturnType

export function useConnectors(
  parameters: UseConnectorsParameters = {},
): UseConnectorsReturnType {
  const config = useConfig(parameters)

  const [connectors, setConnectors] = createStore<GetConnectorsReturnType>(
    getConnectors(config),
  )

  const unsubscribe = watchConnectors(config, {
    onChange: () => setConnectors(getConnectors(config)),
  })

  onCleanup(() => {
    unsubscribe()
  })

  return connectors
}
