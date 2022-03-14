import * as React from 'react'
import { WagmiClient, createWagmiClient } from '@wagmi/core'
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

export type ProviderProps = {
  /**
   * WagmiClient instance
   * @default new WagmiClient()
   */
  client?: WagmiClient
  /**
   * react-query instance
   * @default new QueryClient()
   */
  queryClient?: QueryClient
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

export const Provider = ({
  children,
  client = createWagmiClient(),
  queryClient = new QueryClient(defaultQueryClientConfig),
}: React.PropsWithChildren<ProviderProps>) => {
  React.useMemo(() => {
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
  }, [client, queryClient])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    // Attempt to connect on mount
    ;(async () => {
      if (!client.config.autoConnect) return
      await client.autoConnect()
    })()

    return () => {
      client.destroy()
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Context.Provider value={client}>
      <QueryClientProvider client={queryClient}>
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
