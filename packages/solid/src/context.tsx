import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import type { Provider, WebSocketProvider } from '@wagmi/core'
import { createContext, useContext } from 'solid-js'
import type { ParentProps } from 'solid-js'

import type { Client } from './client'

export const Context = createContext<
  Client<Provider, WebSocketProvider> | undefined
>(undefined)

const queryClient = new QueryClient()
const queryClientContext = createContext<QueryClient | undefined>(queryClient)

export type WagmiConfigProps<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = {
  /** React-decorated Client instance */
  client: Client<TProvider, TWebSocketProvider>
  queryClient?: QueryClient
}
export function WagmiProvider<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>(props: ParentProps<WagmiConfigProps<TProvider, TWebSocketProvider>>) {
  return (
    <QueryClientProvider
      context={queryClientContext}
      client={props.client.queryClient ?? queryClient}
    >
      <Context.Provider value={props.client as any}>
        {props.children}
      </Context.Provider>
    </QueryClientProvider>
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
        'Read more: https://wagmi.sh/solid/WagmiConfig',
      ].join('\n'),
    )
  return client
}
