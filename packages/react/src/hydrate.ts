import * as React from 'react'
import { Provider, WebSocketProvider } from '@wagmi/core'
import {
  DehydratedState as DehydratedQueryState,
  dehydrate as dehydrateQueryClient,
  hydrate as hydrateQueryClient,
} from 'react-query'

import { Client } from './types'
import { useClient } from './context'

export type DehydratedState = {
  data: {
    account?: string
    chain?: {
      id: number
      unsupported: boolean
    }
  }
  queryState: DehydratedQueryState
}

export function dehydrate<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(client: Client<TProvider, TWebSocketProvider>): DehydratedState {
  const queryState = dehydrateQueryClient(client.queryClient)

  return {
    data: {
      account: undefined,
      chain: undefined,
      ...client.data,
    },
    queryState,
  }
}

export function hydrate<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(client: Client<TProvider, TWebSocketProvider>, dehydratedState: unknown) {
  const { data, queryState } = <DehydratedState>dehydratedState ?? {}

  hydrateQueryClient(client.queryClient, queryState)

  client.setState((x) => ({
    ...x,
    data,
    status: data?.account ? 'reconnecting' : x.status,
  }))
}

export type UseHydrateConfig = {
  state: unknown
}

export function useHydrate({ state }: UseHydrateConfig) {
  const client = useClient()

  // hydrate can and should be run *during* render here for SSR to work properly
  React.useMemo(() => {
    if (state) hydrate(client, state)
  }, [client, state])
}

export type HydrateProps = {
  state?: unknown
}

export function Hydrate({
  children,
  state,
}: React.PropsWithChildren<HydrateProps>) {
  useHydrate({ state })

  return children as React.ReactElement
}
