import type { QueryClient } from '@tanstack/solid-query'
import { QueryClientProvider } from '@tanstack/solid-query'
import type { Provider, WebSocketProvider } from '@wagmi/core'
import { createContext, useContext } from 'solid-js'
import type { ParentProps } from 'solid-js'

import type { Client } from './client'

export const Context = createContext<
  Client<Provider, WebSocketProvider> | undefined
>(undefined)

export const queryClientContext = createContext<QueryClient | undefined>(
  undefined,
)

export type WagmiConfigProps<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = {
  /** React-decorated Client instance */
  client: Client<TProvider, TWebSocketProvider>
}
export function WagmiProvider<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>(props: ParentProps<WagmiConfigProps<TProvider, TWebSocketProvider>>) {
  return (
    <Context.Provider value={props.client as any}>
      <QueryClientProvider
        client={props.client.queryClient}
        context={queryClientContext}
      >
        {props.children}
      </QueryClientProvider>
    </Context.Provider>
  )
}

export function useClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>() {
  const client = useContext(Context) as unknown as Client<
    TProvider,
    TWebSocketProvider
  >
  if (!client)
    throw new Error(
      [
        '`useClient` must be used within `WagmiConfig`.\n',
        'Read more: https://wagmi.sh/react/WagmiConfig',
      ].join('\n'),
    )
  return client
}
