/* @refresh reload */
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiDevtools } from '@wagmi/devtools/solid'
import { WagmiProvider } from '@wagmi/solid'
import { render } from 'solid-js/web'

import { App } from './App'
import { config } from './wagmi'

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: { networkMode: 'offlineFirst' },
  },
})

render(
  () => (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <WagmiDevtools queryClient={queryClient} />
    </WagmiProvider>
  ),
  document.getElementById('root')!,
)
