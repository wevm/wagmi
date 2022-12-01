import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import type { Provider, WebSocketProvider } from '@wagmi/core'
import * as React from 'react'

import type { Client } from './client'

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
  // Bailing out of using JSX
  // https://github.com/egoist/tsup/issues/390#issuecomment-933488738
  return React.createElement(Context.Provider, {
    children: React.createElement(QueryClientProvider, {
      children,
      client: client.queryClient,
      context: queryClientContext,
    }),
    value: client as unknown as Client,
  })
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
        'Read more: https://wagmi.sh/react/WagmiConfig',
      ].join('\n'),
    )
  return client
}
