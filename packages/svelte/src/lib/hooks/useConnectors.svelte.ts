import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'
import { useConfig } from './useConfig.svelte.js'

export type UseConnectorsParameters = RuneParameters<ConfigParameter>

export type UseConnectorsReturnType = RuneReturnType<GetConnectorsReturnType>

/** https://wagmi.sh/react/api/hooks/useConnectors */
export function useConnectors(
  parameters: UseConnectorsParameters = () => ({}),
): UseConnectorsReturnType {
  const config = $derived.by(useConfig(parameters))

  let connectors = $state(getConnectors(config))

  $effect(() => {
    connectors = getConnectors(config)
    const unsubscribe = watchConnectors(config, {
      onChange: (newConnectors) => {
        connectors = newConnectors
      },
    })

    return unsubscribe
  })

  return () => connectors
}
