import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { type Accessor, createMemo, useContext } from 'solid-js'
import { WagmiContext } from '../context.js'
import { WagmiProviderNotFoundError } from '../errors/context.js'

export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: useConfig.Parameters<config> = () => ({}),
): useConfig.ReturnType<config> {
  return createMemo(() => {
    const config = parameters().config ?? useContext(WagmiContext)
    if (!config) throw new WagmiProviderNotFoundError()
    return config as config
  })
}

export namespace useConfig {
  export type Parameters<config extends Config = Config> = Accessor<
    SolidParameters<config>
  >
  export type ReturnType<config extends Config = Config> = Accessor<
    SolidReturnType<config>
  >
  export type SolidParameters<config extends Config = Config> =
    ConfigParameter<config>
  export type SolidReturnType<config extends Config = Config> = config
}
