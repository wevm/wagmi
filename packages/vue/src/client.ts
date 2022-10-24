import {
  Persister,
  persistQueryClient,
} from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  QueryClient,
  VueQueryPlugin,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'
import {
  ClientConfig,
  Client as CoreClient,
  Provider,
  WebSocketProvider,
  createClient as createCoreClient,
} from '@wagmi/core'
import { App } from 'vue-demi'

import { deserialize, serialize } from './utils'

export type CreateClientConfig<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = ClientConfig<TProvider, TWebSocketProvider> & {
  vueApp: App<any> | undefined
  queryClient?: QueryClient
  persister?: Persister | null
}

export function createClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>({
  vueApp,
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
  }) as QueryClient,
  persister = typeof window !== 'undefined'
    ? createSyncStoragePersister({
        key: 'wagmi.cache',
        storage: window.localStorage,
        serialize,
        deserialize,
      })
    : undefined,
  ...config
}: CreateClientConfig<TProvider, TWebSocketProvider>): Client {
  if (!vueApp) {
    throw new Error(
      [
        'Must pass the app instance to this function',
        'https://vuejs.org/guide/essentials/application.html',
      ].join('\n'),
    )
  }
  const client = createCoreClient<TProvider, TWebSocketProvider>(config)
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

  VueQueryPlugin.install(vueApp, {
    queryClient,
  } as VueQueryPluginOptions)

  return Object.assign(client, { queryClient }) as Client
}

export type Client<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = CoreClient<TProvider, TWebSocketProvider> & { queryClient: QueryClient }

export const useClient = (client: Client) => {
  // TODO: Currently dangerous to wrap a class as such in a ref. private members issue.
  return client
}
