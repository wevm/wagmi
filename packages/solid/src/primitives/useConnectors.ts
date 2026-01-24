import {
  type Config,
  type GetConnectorsReturnType,
  getConnectors,
  type ResolvedRegister,
  watchConnectors,
} from '@wagmi/core'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useConnectors */
export function useConnectors<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: useConnectors.Parameters<config> = () => ({}),
): useConnectors.ReturnType<config> {
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

export namespace useConnectors {
  export type Parameters<config extends Config = Config> = Accessor<
    SolidParameters<config>
  >

  export type ReturnType<config extends Config = Config> = Accessor<
    SolidReturnType<config>
  >

  export type SolidParameters<config extends Config = Config> =
    useConfig.SolidParameters<config>

  export type SolidReturnType<config extends Config = Config> =
    GetConnectorsReturnType<config>
}
