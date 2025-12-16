import type { Config, ResolvedRegister } from '@wagmi/core'
import { type Accessor, createMemo, useContext } from 'solid-js'
import { WagmiContext } from '../context.js'
import { WagmiProviderNotFoundError } from '../errors/context.js'
import type { ConfigParameter } from '../types/properties.js'

export type SolidConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigParameters<config extends Config = Config> = Accessor<
  SolidConfigParameters<config>
>

export type UseConfigReturnType<config extends Config = Config> =
  Accessor<config>

export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = () => ({}),
): UseConfigReturnType<config> {
  return createMemo(() => {
    const config = parameters().config ?? useContext(WagmiContext)
    if (!config) throw new WagmiProviderNotFoundError()
    return config as config
  })
}
