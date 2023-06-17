import { QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { type Config, type ResolvedRegister, reconnect } from '@wagmi/core'
import { type OneOf } from '@wagmi/core/internal'
import * as React from 'react'

export const WagmiContext = React.createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiConfigProps = OneOf<
  | {
      /** @deprecated Use `value` instead */
      config: Config
    }
  | {
      value: Config
    }
>

export function WagmiConfig({
  children,
  ...props
}: React.PropsWithChildren<WagmiConfigProps>) {
  const value = props.config ?? props.value
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
