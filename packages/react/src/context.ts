import { QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { type Config, reconnect } from '@wagmi/core'
import * as React from 'react'

export const WagmiContext = React.createContext<Config | undefined>(undefined)

export type WagmiConfigProps = {
  value: Config
}

export function WagmiConfig({
  children,
  value,
}: React.PropsWithChildren<WagmiConfigProps>) {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && value._internal.reconnectOnMount)
      reconnect(value)
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
