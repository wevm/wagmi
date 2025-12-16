import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type SolidConnectionsParameters = ConfigParameter

export type UseConnectionsParameters = Accessor<SolidConnectionsParameters>

export type UseConnectionsReturnType = Accessor<GetConnectionsReturnType>

/** https://wagmi.sh/solid/api/primitives/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = () => ({}),
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  const [connections, setConnections] = createSignal(getConnections(config()))

  createEffect(() => {
    const _config = config()
    setConnections(() => getConnections(_config))

    const unsubscribe = watchConnections(_config, {
      onChange(data) {
        setConnections(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })

  return connections
}
