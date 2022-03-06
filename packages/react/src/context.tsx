import * as React from 'react'
import { WagmiClient, createWagmiClient } from '@wagmi/core'
import { QueryClient, QueryClientProvider } from 'react-query'

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

export const Provider = ({
  children,
  client = createWagmiClient(),
  queryClient = new QueryClient(),
}: React.PropsWithChildren<Props>) => {
  // Attempt to connect on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!client.autoConnect) return
    ;(async () => {
      await client.autoConnect()
    })()

    return () => {
      client.destroy()
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Context.Provider value={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Context.Provider>
  )
}

export const useClient = () => {
  const client = React.useContext(Context)
  if (!client) throw Error('Must be used within WagmiProvider')
  return client
}
