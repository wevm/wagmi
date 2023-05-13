import { QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import * as React from 'react'

import { type Config } from '@wagmi/core'

export const WagmiContext = React.createContext<Config | undefined>(undefined)

export type WagmiConfigProps = {
  value: Config
}

export function WagmiConfig({
  children,
  value,
}: React.PropsWithChildren<WagmiConfigProps>) {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && value.reconnectOnMount)
      value.reconnect()
  }, [])

  return React.createElement(
    WagmiContext.Provider,
    { value },
    value.persister
      ? React.createElement(PersistQueryClientProvider, {
          children,
          client: value.queryClient,
          persistOptions: { persister: value.persister },
        })
      : React.createElement(QueryClientProvider, {
          children,
          client: value.queryClient,
        }),
  )
}

export function useConfig() {
  const config = React.useContext(WagmiContext)
  if (!config) throw new Error('`useConfig` must be used within `WagmiConfig`.')
  return config
}
