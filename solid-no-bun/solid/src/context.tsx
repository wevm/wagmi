'use client'

import { type ResolvedRegister, type State } from '@wagmi/core'
import { Hydrate } from './hydrate.js'
import { createSignal, type ParentProps } from 'solid-js'

export type WagmiProviderProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export const [config, setConfig] = createSignal()

export function WagmiProvider(
  parameters: ParentProps<WagmiProviderProps>,
) {
  setConfig(parameters.config)
  return <Hydrate {...parameters} />
}
