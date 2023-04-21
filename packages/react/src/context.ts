import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import type { PublicClient, WebSocketPublicClient } from '@wagmi/core'
import * as React from 'react'

import type { Client } from './client'

export const Context = React.createContext<
  Client<PublicClient, WebSocketPublicClient> | undefined
>(undefined)

export const queryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
)

export type WagmiConfigProps<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = {
  /** React-decorated Client instance */
  client: Client<TPublicClient, TWebSocketPublicClient>
}
export function WagmiConfig<
  TPublicClient extends PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient,
>({
  children,
  client,
}: React.PropsWithChildren<
  WagmiConfigProps<TPublicClient, TWebSocketPublicClient>
>) {
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
  TPublicClient extends PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>() {
  const client = React.useContext(Context) as unknown as Client<
    TPublicClient,
    TWebSocketPublicClient
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
