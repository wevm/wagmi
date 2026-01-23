import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useConnections */
export function useConnections(
  parameters: useConnections.Parameters = () => ({}),
): useConnections.ReturnType {
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

export namespace useConnections {
  export type Parameters = Accessor<SolidParameters>
  export type ReturnType = Accessor<SolidReturnType>
  export type SolidParameters = ConfigParameter
  export type SolidReturnType = GetConnectionsReturnType
}
