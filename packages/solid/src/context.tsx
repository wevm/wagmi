import type { Client, Provider, WebSocketProvider } from '@wagmi/core'
import type { ParentProps } from 'solid-js'

import { createContext, useContext } from 'solid-js'

export type WagmiContextProps<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
> = { client: Client<TProvider, TWebSocketProvider> }

export const Context = createContext<[client: Client] | undefined>(undefined)

export const WagmiProvider = <
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>(
  props: ParentProps<WagmiContextProps<TProvider, TWebSocketProvider>>,
) => {
  return (
    <Context.Provider value={[props.client as any]}>
      {props.children}
    </Context.Provider>
  )
}

export function useClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>() {
  const client = useContext(Context) as unknown as [
    client: Client<TProvider, TWebSocketProvider>,
  ]
  if (!client)
    throw new Error(
      ['`useClient` must be used within `WagmiProvider`.\n'].join('\n'),
    )
  return client
}
