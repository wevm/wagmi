import * as React from 'react'
import { WagmiClient, createWagmiClient } from '@wagmi/core'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

export const Context = React.createContext<WagmiClient | undefined>(undefined)

export type Props = {
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

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
      retry: 0,
    },
  },
})

const AutoConnect = () => {
  const client = useClient()
  // Attempt to connect on mount
  useQuery(
    'connect',
    async () => {
      const data = await client.autoConnect()
      return {
        account: data?.account,
        chain: data?.chain,
      }
    },
    {
      enabled: Boolean(client.config.autoConnect && client.lastUsedConnector),
      queryHash: 'connect',
    },
  )
  return null
}

export const Provider = ({
  children,
  client = createWagmiClient(),
  queryClient = defaultQueryClient,
}: React.PropsWithChildren<Props>) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const localStoragePersistor = createWebStoragePersistor({
      storage: (client.storage as Storage) || window.localStorage,
    })

    persistQueryClient({
      queryClient: defaultQueryClient,
      persistor: localStoragePersistor,
    })

    return () => {
      client.destroy()
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Context.Provider value={client}>
      <QueryClientProvider client={queryClient}>
        <AutoConnect />
        {children}
      </QueryClientProvider>
    </Context.Provider>
  )
}

export const useClient = () => {
  const client = React.useContext(Context)
  if (!client) throw Error('Must be used within WagmiProvider')
  return client
}
