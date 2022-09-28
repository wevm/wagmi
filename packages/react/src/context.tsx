import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider, WebSocketProvider } from '@wagmi/core'
import * as React from 'react'

import { Client } from './client'

export const Context = React.createContext<
  Client<Provider, WebSocketProvider> | undefined
>(undefined)

export const queryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
)

export type WagmiConfigProps<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = {
  /** React-decorated Client instance */
  client: Client<TProvider, TWebSocketProvider>
}
export function WagmiConfig<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>({
  children,
  client,
}: React.PropsWithChildren<WagmiConfigProps<TProvider, TWebSocketProvider>>) {
  return (
    <Context.Provider value={client as unknown as Client}>
      <QueryClientProvider
        client={client.queryClient}
        context={queryClientContext}
      >
        {children}
      </QueryClientProvider>
    </Context.Provider>
  )
}

export function useClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>() {
  const client = React.useContext(Context) as unknown as Client<
    TProvider,
    TWebSocketProvider
  >
  if (!client)
    throw new Error(
      [
        '`useClient` must be used within `WagmiConfig`.\n',
        'Read more: https://wagmi.sh/docs/WagmiConfig',
      ].join('\n'),
    )
  return client
}
