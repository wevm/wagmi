import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import type {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import type {
  Config as CoreConfig,
  CreateConfigParameters as CreateCoreConfigParameters,
  PublicClient,
  WebSocketPublicClient,
} from '@wagmi/core'
import {
  createConfig as createCoreConfig,
  createStorage,
  noopStorage,
} from '@wagmi/core'

export type CreateConfigParameters<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = CreateCoreConfigParameters<TPublicClient, TWebSocketPublicClient> & {
  queryClient?: QueryClient
  persister?: Persister | null
}

export function createConfig<
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
  ...args
}: CreateConfigParameters<TPublicClient, TWebSocketPublicClient>) {
  const config = createCoreConfig<TPublicClient, TWebSocketPublicClient>({
    ...args,
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
  return Object.assign(config, { queryClient })
}

export type Config<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = CoreConfig<TPublicClient, TWebSocketPublicClient> & {
  queryClient: QueryClient
}
