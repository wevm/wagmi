import * as React from 'react'
import {
  WagmiClient,
  ClientConfig as WagmiClientConfig,
  createClient as createWagmiClient,
} from '@wagmi/core'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

import stringify from './utils/safe-stringify'

export const Context = React.createContext<WagmiClient | undefined>(undefined)

export type ClientConfig = WagmiClientConfig & {
  queryClient?: QueryClient
}

export type ProviderProps = {
  /**
   * React-decorated WagmiClient instance
   */
  client?: ReturnType<typeof createClient>
}

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
      retry: 0,
    },
  },
}

export const createClient = ({
  queryClient = new QueryClient(defaultQueryClientConfig),
  ...config
}: ClientConfig = {}) => {
  const client = createWagmiClient(config)
  const persistor = createWebStoragePersistor({
    storage: (client.storage as Storage) || window.localStorage,
    serialize: stringify,
  })
  persistQueryClient({
    queryClient,
    persistor,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => query.cacheTime !== 0,
    },
  })
  return Object.assign(client, { queryClient })
}

export const Provider = ({
  children,
  client = createClient(),
}: React.PropsWithChildren<ProviderProps>) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    // Attempt to connect on mount
    ;(async () => {
      if (!client.config.autoConnect) return
      await client.autoConnect()
    })()

    // Make sure client cleans up
    return () => {
      client.destroy()
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Context.Provider value={client}>
      <QueryClientProvider client={client.queryClient}>
        {children}
        {/* Automatically removed for production build */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Context.Provider>
  )
}

export const useClient = () => {
  const client = React.useContext(Context)
  if (!client) throw Error('Must be used within WagmiProvider')
  return client
}
