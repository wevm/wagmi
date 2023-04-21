import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import type {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import type {
  ClientConfig,
  Client as CoreClient,
  PublicClient,
  WebSocketPublicClient,
} from '@wagmi/core'
import {
  createClient as createCoreClient,
  createStorage,
  noopStorage,
} from '@wagmi/core'

export type CreateClientConfig<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = ClientConfig<TPublicClient, TWebSocketPublicClient> & {
  queryClient?: QueryClient
  persister?: Persister | null
}
export function createClient<
  TPublicClient extends PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient,
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
  storage = createStorage({
    storage:
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : noopStorage,
  }),
  persister = typeof window !== 'undefined'
    ? createSyncStoragePersister({
        key: 'cache',
        storage,
        // Serialization is handled in `storage`.
        serialize: (x) => x as unknown as string,
        // Deserialization is handled in `storage`.
        deserialize: (x) => x as unknown as PersistedClient,
      })
    : undefined,
  ...config
}: CreateClientConfig<TPublicClient, TWebSocketPublicClient>) {
  const client = createCoreClient<TPublicClient, TWebSocketPublicClient>({
    ...config,
    storage,
  })
  if (persister)
    persistQueryClient({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) =>
          query.cacheTime !== 0 &&
          // Note: adding a `persist` flag to a query key will instruct the
          // persister whether or not to persist the response of the query.
          (query.queryKey[0] as { persist?: boolean }).persist !== false,
      },
    })
  return Object.assign(client, { queryClient })
}

export type Client<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = CoreClient<TPublicClient, TWebSocketPublicClient> & {
  queryClient: QueryClient
}
