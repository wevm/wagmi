/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'

import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from 'solid-wagmi'
import { config } from './wagmi.js'

// `@coinbase-wallet/sdk` uses `Buffer`
window.Buffer = Buffer

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

const root = document.getElementById('root')

render(() =>(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </WagmiProvider>
  ), root!)

  declare global {
    interface Window {
      Buffer?: unknown
    }
  }