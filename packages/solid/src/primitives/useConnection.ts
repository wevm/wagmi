import {
  type Config,
  type GetConnectionReturnType,
  getConnection,
  type ResolvedRegister,
  watchConnection,
} from '@wagmi/core'
import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js'
import type { ConfigParameter } from '../types/properties.js'

import { useConfig } from './useConfig.js'

export type SolidConnectionParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConnectionParameters<config extends Config = Config> = Accessor<
  SolidConnectionParameters<config>
>

export type UseConnectionReturnType<config extends Config = Config> = Accessor<
  GetConnectionReturnType<config>
>

/** https://wagmi.sh/solid/api/primitives/useConnection */
export function useConnection<
  config extends Config = ResolvedRegister['config'],
>(
  parameters: UseConnectionParameters<config> = () => ({}),
): UseConnectionReturnType<config> {
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
