import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import type { PublicClient, WebSocketPublicClient } from '@wagmi/core'
import * as React from 'react'

import type { Config } from './config'

export const Context = React.createContext<
  Config<PublicClient, WebSocketPublicClient> | undefined
>(undefined)

export const queryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
)

export type WagmiConfigProps<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = {
  /** React-decorated Client instance */
  config: Config<TPublicClient, TWebSocketPublicClient>
}
export function WagmiConfig<
  TPublicClient extends PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient,
>({
  children,
  config,
}: React.PropsWithChildren<
  WagmiConfigProps<TPublicClient, TWebSocketPublicClient>
>) {
  // Bailing out of using JSX
  // https://github.com/egoist/tsup/issues/390#issuecomment-933488738
  return React.createElement(Context.Provider, {
    children: React.createElement(QueryClientProvider, {
      children,
      client: config.queryClient,
      context: queryClientContext,
    }),
    value: config as unknown as Config,
  })
}

export function useConfig<
  TPublicClient extends PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>() {
  const config = React.useContext(Context) as unknown as Config<
    TPublicClient,
    TWebSocketPublicClient
  >
  if (!config)
    throw new Error(
      [
        '`useConfig` must be used within `WagmiConfig`.\n',
        'Read more: https://wagmi.sh/react/WagmiConfig',
      ].join('\n'),
    )
  return config
}
