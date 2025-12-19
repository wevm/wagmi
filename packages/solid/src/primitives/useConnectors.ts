import {
  type Config,
  type GetConnectorsReturnType,
  getConnectors,
  type ResolvedRegister,
  watchConnectors,
} from '@wagmi/core'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'

import type { SolidConfigParameters } from './useConfig.js'
import { useConfig } from './useConfig.js'

export type SolidConnectorsParameters<config extends Config = Config> =
  SolidConfigParameters<config>

export type UseConnectorsParameters<config extends Config = Config> = Accessor<
  SolidConnectorsParameters<config>
>

export type SolidConnectorsReturnType<config extends Config = Config> =
  GetConnectorsReturnType<config>

export type UseConnectorsReturnType<config extends Config = Config> = Accessor<
  SolidConnectorsReturnType<config>
>

/** https://wagmi.sh/solid/api/primitives/useConnectors */
export function useConnectors<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectorsParameters<config> = () => ({}),
): UseConnectorsReturnType<config> {
  const config = useConfig(parameters)

  const [connectors, setConnectors] = createSignal(getConnectors(config()))

  createEffect(() => {
    const _config = config()
    setConnectors(() => getConnectors(_config))

    const unsubscribe = watchConnectors(_config, {
      onChange(data) {
        setConnectors(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })

  return connectors
}
