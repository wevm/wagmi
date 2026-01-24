import {
  type Config,
  type GetConnectionReturnType,
  getConnection,
  type ResolvedRegister,
  watchConnection,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useConnection */
export function useConnection<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: useConnection.Parameters<config> = () => ({}),
): useConnection.ReturnType<config> {
  const config = useConfig(parameters)
  const [connection, setConnection] = createSignal(getConnection(config()))
  createEffect(() => {
    const _config = config()
    setConnection(() => getConnection(_config))
    const unsubscribe = watchConnection(_config, {
      onChange(data) {
        setConnection(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })
  return connection
}

export namespace useConnection {
  export type Parameters<config extends Config = Config> = Accessor<
    SolidParameters<config>
  >
  export type ReturnType<config extends Config = Config> = Accessor<
    SolidReturnType<config>
  >
  export type SolidParameters<config extends Config = Config> =
    ConfigParameter<config>
  export type SolidReturnType<config extends Config = Config> =
    GetConnectionReturnType<config>
}
