import type { ResolvedRegister, State } from '@wagmi/core'
import { type JSX, type ParentProps, createContext, splitProps } from 'solid-js'

import { Hydrate } from './hydrate.js'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>()

export type WagmiProviderProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function WagmiProvider(
  props: ParentProps<WagmiProviderProps>,
): JSX.Element {
  const [hydrateProps, providerProps, restProps] = splitProps(
    props,
    ['config', 'initialState', 'reconnectOnMount'],
    ['config'],
  )
  return (
    <Hydrate {...hydrateProps}>
      <WagmiContext.Provider
        value={providerProps.config}
        {...(restProps as { children: JSX.Element })}
      />
    </Hydrate>
  )
}
