import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import {
  Persister,
  persistQueryClient,
} from '@tanstack/react-query-persist-client'
import {
  ClientConfig,
  Client as CoreClient,
  Provider,
  WebSocketProvider,
  createClient as createCoreClient,
} from '@wagmi/core'

import { deserialize, serialize } from './utils'

export type CreateClientConfig<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = ClientConfig<TProvider, TWebSocketProvider> & {
  queryClient?: QueryClient
  persister?: Persister | null
}
export function createClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>({
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false,
        retry: 0,
      },
      mutations: {
        networkMode: 'offlineFirst',
      },
    },
  }),
  persister = typeof window !== 'undefined'
    ? createSyncStoragePersister({
        key: 'wagmi.cache',
        storage: window.localStorage,
        serialize,
        deserialize,
      })
    : undefined,
  ...config
}: CreateClientConfig<TProvider, TWebSocketProvider>) {
  const client = createCoreClient<TProvider, TWebSocketProvider>(config)
  if (persister)
    persistQueryClient({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => query.cacheTime !== 0,
      },
    })
  return Object.assign(client, { queryClient })
}

export type Client<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = CoreClient<TProvider, TWebSocketProvider> & { queryClient: QueryClient }
