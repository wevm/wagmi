import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'
import { useConfig } from './useConfig.svelte.js'

export type UseConnectionsParameters = RuneParameters<ConfigParameter>

export type UseConnectionsReturnType = RuneReturnType<GetConnectionsReturnType>

/** https://wagmi.sh/react/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = () => ({}),
): UseConnectionsReturnType {
  const config = $derived.by(useConfig(parameters))

  let connections = $state(getConnections(config))

  $effect(() => {
    connections = getConnections(config)
    const unsubscribe = watchConnections(config, {
      onChange: (newConnections) => {
        connections = newConnections
      },
    })

    return unsubscribe
  })

  return () => connections
}
