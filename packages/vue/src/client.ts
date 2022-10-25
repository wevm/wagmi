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
import { App, ComputedRef, computed, ref } from 'vue-demi'

import { deserialize, serialize } from './utils'

export type CreateClientConfig<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = ClientConfig<TProvider, TWebSocketProvider> & {
  app: App<any> | undefined
  queryClient?: QueryClient
  persister?: Persister | null
}

export function createClient<
  TProvider extends Provider,
  TWebSocketProvider extends WebSocketProvider,
>({
  app,
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
  if (!app) {
    throw new Error(
      [
        'Must pass the app instance to this function',
        'https://vuejs.org/guide/essentials/application.html',
      ].join('\n'),
    )
  }

  // https://www.npmjs.com/package/@tanstack/vue-query -> Initialize Vue Query with the VueQueryPlugin as described in step 2
  VueQueryPlugin.install(app, {
    queryClient,
  } as VueQueryPluginOptions)

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

  return Object.assign(client, { queryClient }) as Client
}

export type Client<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = CoreClient<TProvider, TWebSocketProvider> & { queryClient: QueryClient }

const client = ref<Client | undefined>()

export const initClient = (c: Client, app: App<any>) => {
  client.value = c
  app.config.globalProperties.wagmiClient = client
}

export const useClient = () => {
  return computed(() => client.value) as ComputedRef<Client>
}
