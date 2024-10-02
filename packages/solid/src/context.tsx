import type { ResolvedRegister } from '@wagmi/core'
import { type ParentProps, createContext } from 'solid-js'

import { Hydrate } from './hydrate.jsx'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiProviderProps = {
  config: ResolvedRegister['config']
  // initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function WagmiProvider(props: ParentProps<WagmiProviderProps>) {
  return (
    <Hydrate {...props}>
      <WagmiContext.Provider value={props.config}>
        {props.children}
      </WagmiContext.Provider>
    </Hydrate>
  )
}
