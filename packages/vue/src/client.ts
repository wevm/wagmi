import { createClient as createCoreClient } from '@wagmi/core'
import { shallowRef, triggerRef, markRaw, inject } from 'vue-demi'
import { QueryClient, VueQueryPlugin } from 'vue-query'

import type { App, Raw, InjectionKey, ShallowRef } from 'vue-demi'
import type { Client as CoreClient, ClientConfig } from '@wagmi/core'

export type Client = CoreClient & {
  install(app: App): void
}

export type CreateClientConfig = ClientConfig & {
  queryClient?: QueryClient
}

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1_000 * 60 * 60 * 24,
      // TODO: uncomment when persistor becomes available
      // networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      // TODO: uncomment when persistor becomes available
      // networkMode: 'offlineFirst',
    },
  },
})

export const ClientInjectionKey: InjectionKey<Raw<ShallowRef<Client>>> =
  Symbol('@wagmi/vue')

export function createClient({
  queryClient = defaultQueryClient,
  ...config
}: CreateClientConfig) {
  const client = createCoreClient(config) as Client

  client.install = function (app: App) {
    app.use(VueQueryPlugin, { queryClient })

    const clientRef = shallowRef(client)

    if (client.config.autoConnect) client.autoConnect()

    const markClient = markRaw(clientRef)
    const unsubscribe = client.subscribe(() => {
      triggerRef(markClient)
    })

    const orgUnmount = app.unmount
    app.unmount = () => {
      unsubscribe()
      orgUnmount()
    }

    app.provide(ClientInjectionKey, markClient)
  }

  return client
}

export function useClient() {
  const client = inject(ClientInjectionKey)
  if (!client) {
    // TODO: doc
    throw new Error(
      'No wagmi client found. Ensure you have set up a client: https://wagmi.sh/react/client',
    )
  }

  return client
}
