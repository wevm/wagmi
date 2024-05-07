import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

export const queryClient = new QueryClient()

export function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
